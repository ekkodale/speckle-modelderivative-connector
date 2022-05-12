import {ModelUrnExtension} from "./ModelUrnExtension";

export class ModelUrnExtensionHelper {
	private static instance: ModelUrnExtensionHelper;
	extension: ModelUrnExtension | undefined;

	static getInstance(): ModelUrnExtensionHelper {
		if (!ModelUrnExtensionHelper.instance) {
			ModelUrnExtensionHelper.instance = new ModelUrnExtensionHelper();
		}
		return ModelUrnExtensionHelper.instance;
	}

	addExtension(extension: ModelUrnExtension) {
		this.extension = extension;
	}

	loadNewModel(urn: string) {
		this.extension?.loadNewModel(urn);
	}
}
