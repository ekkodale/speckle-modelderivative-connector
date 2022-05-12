export class ShowcaseModelSingleton {
	private static instance: ShowcaseModelSingleton;
	model: Autodesk.Viewing.Model | undefined;

	static getInstance(): ShowcaseModelSingleton {
		if (!ShowcaseModelSingleton.instance) {
			ShowcaseModelSingleton.instance = new ShowcaseModelSingleton();
		}
		return ShowcaseModelSingleton.instance;
	}

	setModel(model: Autodesk.Viewing.Model) {
		this.model = model;
	}

	getModel(): Autodesk.Viewing.Model | undefined {
		return this.model;
	}
}
