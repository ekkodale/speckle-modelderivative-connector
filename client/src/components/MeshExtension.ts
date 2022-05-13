import {Va3cContainer, Va3cMesh, Va3cProperty} from "./../api/client";
import {Client, OkResult, Va3cGeometry, Va3cGeometryData, Va3cMaterial, Va3cObject} from "../api/client";
import Config from "../Config";
import {MeshExtensionHelper} from "./MeshExtensionHelper";

export class MeshExtension extends Autodesk.Viewing.Extension {
	va3cObjectList: Va3cObject[];

	constructor(viewer: any, options: any) {
		super(viewer, options);
		Autodesk.Viewing.Extension.call(this, viewer, options);
		const s1 = MeshExtensionHelper.getInstance();
		s1.addExtension(this);
		this.va3cObjectList = [];
	}

	load(): boolean {
		console.log("ModelUrnExtension loaded!");
		return true;
	}

	unload(): boolean {
		return true;
	}

	async commitFunc(streamID: string) {
		const models: Autodesk.Viewing.Model[] = this.viewer.getAllModels();
		const model: Autodesk.Viewing.Model = models[0];

		let instanceTree = model.getData().instanceTree;
		const mapping: Map<number, number[]> = new Map();
		let fragIds: Array<any> = [];
		let va3cObjectList: Va3cObject[] = [];

		instanceTree.fragList.fragments.fragId2dbId.forEach((dbId: number) => {
			let tempFragIds: number[] = [];
			instanceTree.enumNodeFragments(dbId, function (fragId: any) {
				fragIds.push(fragId);
				tempFragIds.push(fragId);
			});
			mapping.set(dbId, tempFragIds);
		});

		mapping.forEach((values: number[], key: number) => {
			model.getProperties(key, (result: Autodesk.Viewing.PropertyResult) => {
				let rootVac3Object: Va3cObject = new Va3cObject();
				rootVac3Object.uuid = result.externalId;
				rootVac3Object.userData = [];
				rootVac3Object.matrix = []
				result.properties.forEach((property: Autodesk.Viewing.Property) => {
					let vacProperty: Va3cProperty = new Va3cProperty();
					vacProperty.name = property.displayName;
					vacProperty.value = String(property.displayValue);
					vacProperty.type = "TYPE"
					rootVac3Object.userData?.push(vacProperty);
				});
				rootVac3Object.children = [];
				values.forEach((fragId: number) => {
					let renderProxy = this.viewer.impl.getRenderProxy(model, fragId);
					const childVacObject: Va3cMesh = this.createVac3ObjectChild(renderProxy.geometry, renderProxy.material, renderProxy.matrix);
					if (rootVac3Object.children) {
						rootVac3Object.children.push(childVacObject);
					}
				});
				this.va3cObjectList.push(rootVac3Object);
			});
		});
	}

	commitFuncc(streamID: string) {
		const client: Client = new Client(Config.BaseURL);
		const commitObject: Va3cContainer = new Va3cContainer();
		commitObject.va3cObjects = this.va3cObjectList;
		console.log(commitObject);
		commitObject.streamId = streamID;
		client
			.commits(commitObject)
			.then((response: OkResult) => {
				console.log("Commited successfully!");
				console.log(response);
			})
			.catch((error: any) => {
				console.log("Something went wrong with the commit: " + error);
			});
	}

	createVac3ObjectChild(renderProxyGeometry: any, renderProxyMaterial: any, renderProxyMatrix: any): Va3cMesh {
		// Init Vac3Object
		let vac3Object: Va3cMesh = new Va3cMesh();
		vac3Object.uuid = "HallolXegalHalloPasstauch.";

		vac3Object.geometry = new Va3cGeometry();
		vac3Object.geometry.data = new Va3cGeometryData();

		vac3Object.material = new Va3cMaterial();

		// Assign geometry
		vac3Object.geometry.data.colors = [];
		vac3Object.geometry.type = "ugabuga"
		vac3Object.geometry.uuid = "auchstring"
		vac3Object.geometry.data.faces = renderProxyGeometry.ib;
		vac3Object.geometry.data.vertices = renderProxyGeometry.vb;

		// Assign material
		vac3Object.material.uuid = renderProxyMaterial.uuid;
		vac3Object.material.name = renderProxyMaterial.name;
		vac3Object.material.type = renderProxyMaterial.type;
		vac3Object.material.color = 16777215;
		vac3Object.material.ambient = 16777215;
		vac3Object.material.emissive =16777215;
		vac3Object.material.specular = 16777215;
		vac3Object.material.shininess = renderProxyMaterial.shininess;
		vac3Object.material.opacity = renderProxyMaterial.opacity;
		vac3Object.material.transparent = renderProxyMaterial.transparent;
		vac3Object.material.wireframe = renderProxyMaterial.wireframe;
		return vac3Object;
	}

	private delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
