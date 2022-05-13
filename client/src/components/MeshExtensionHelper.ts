import { MeshExtension } from "./MeshExtension";

export class MeshExtensionHelper {
	private static instance: MeshExtensionHelper;
	extension: MeshExtension | undefined;

	static getInstance(): MeshExtensionHelper {
		if (!MeshExtensionHelper.instance) {
			MeshExtensionHelper.instance = new MeshExtensionHelper();
		}
		return MeshExtensionHelper.instance;
	}

	addExtension(extension: MeshExtension) {
		this.extension = extension;
	}

	commitFunc(streamId: string) {
		this.extension?.commitFunc(streamId);
	}

	commitFuncc(streamId: string) {
		this.extension?.commitFuncc(streamId);
	}
}
