import {Va3cMesh} from "./../api/client";
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
		const client: Client = new Client(Config.BaseURL);
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
				rootVac3Object.userData = {};
				result.properties.forEach((property: Autodesk.Viewing.Property) => {
					if (rootVac3Object.userData) {
						rootVac3Object.userData[property.displayName] = property.displayValue;
					}
				});
				rootVac3Object.children = [];
				values.forEach((fragId: number) => {
					let renderProxy = this.viewer.impl.getRenderProxy(model, fragId);
					const childVacObject: Va3cObject = this.createVac3ObjectChild(renderProxy.geometry, renderProxy.material, renderProxy.matrix);
					if (rootVac3Object.children) {
						rootVac3Object.children.push(childVacObject);
					}
				});
				this.va3cObjectList.push(rootVac3Object);
			});
		});
		await this.delay(2000);
		client
			.commits(streamID, this.va3cObjectList)
			.then((response: OkResult) => {
				console.log("Commited successfully!");
				console.log(response);
			})
			.catch((error: any) => {
				console.log("Something went wrong with the commit: " + error);
			});
	}

	createVac3ObjectChild(renderProxyGeometry: any, renderProxyMaterial: any, renderProxyMatrix: any): Va3cObject {
		// Init Vac3Object
		let vac3Object: Va3cMesh = new Va3cObject();

		vac3Object.geometry = new Va3cGeometry();
		vac3Object.geometry.data = new Va3cGeometryData();

		vac3Object.material = new Va3cMaterial();

		// Assign geometry
		vac3Object.geometry.data.faces = renderProxyGeometry.ib;
		vac3Object.geometry.data.vertices = renderProxyGeometry.vb;

		// Assign material
		vac3Object.material.uuid = renderProxyMaterial.uuid;
		vac3Object.material.name = renderProxyMaterial.name;
		vac3Object.material.type = renderProxyMaterial.type;
		vac3Object.material.color = renderProxyMaterial.color;
		vac3Object.material.ambient = renderProxyMaterial.ambient;
		vac3Object.material.emissive = renderProxyMaterial.emissive;
		vac3Object.material.specular = renderProxyMaterial.specular;
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
