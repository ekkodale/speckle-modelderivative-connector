import {MeshExtensionHelper} from "./MeshExtensionHelper";

export class MeshExtension extends Autodesk.Viewing.Extension {
	constructor(viewer: any, options: any) {
		super(viewer, options);
		Autodesk.Viewing.Extension.call(this, viewer, options);
		const s1 = MeshExtensionHelper.getInstance();
		s1.addExtension(this);
	}

	load(): boolean {
		console.log("ModelUrnExtension loaded!");
		return true;
	}

	unload(): boolean {
		return true;
	}

	testFunc() {
		const models: Autodesk.Viewing.Model[] = this.viewer.getAllModels();
		const model: Autodesk.Viewing.Model = models[0];
		let fragIds: any = [];
		let instanceTree = model.getData().instanceTree;
		instanceTree.fragList.fragments.fragId2dbId.forEach((element: number) => {
			console.log(this.viewer.impl.getRenderProxy(this.viewer.model, 0));
			console.log(this.viewer.impl.getRenderProxy(this.viewer.model, 100));
			return;
		});
	}
}
