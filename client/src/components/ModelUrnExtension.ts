import {ModelUrnExtensionHelper} from "./ModelUrnExtensionHelper";

export class ModelUrnExtension extends Autodesk.Viewing.Extension {
	constructor(viewer: any, options: any) {
		super(viewer, options);
		Autodesk.Viewing.Extension.call(this, viewer, options);
		const s1 = ModelUrnExtensionHelper.getInstance();
		s1.addExtension(this);
	}

	load(): boolean {
		console.log("ModelUrnExtension loaded!");
		return true;
	}

	unload(): boolean {
		return true;
	}

	loadNewModel(urn: string) {
		const models = this.viewer.getAllModels();
		this.viewer.unloadModel(models[0]);
		Autodesk.Viewing.Document.load(
			"urn:" + urn,
			(doc) => {
				const bubbleNode: Autodesk.Viewing.BubbleNode = doc.getRoot().getDefaultGeometry();
				doc.downloadAecModelData().then(() => {
					Autodesk.Viewing.Document.getAecModelData(bubbleNode).then(() => {
						let globalOffset = this.viewer.model?.getData().globalOffset;
						this.viewer.loadDocumentNode(doc, bubbleNode, {
							applyRefpoint: true,
							globalOffset: globalOffset,
							keepCurrentModels: true,
						});
					});
				});
			},
			(err) => {
				console.log("error loading doc");
			},
			(success: any) => {
				console.log(success);
			}
		);
	}
}
