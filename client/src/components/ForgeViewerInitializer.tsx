import Config from "../Config";

export const initializeViewer = async (urn: string) => {
	const authURN: string = Config.AutodeskAuthentication as string;
	const clientID: string = Config.ClientID as string;
	const clientSecret: string = Config.ClientSecret as string;
	let container: HTMLElement | null;
	let viewer: Autodesk.Viewing.GuiViewer3D;
	fetch(authURN, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			client_id: clientID,
			client_secret: clientSecret,
			grant_type: "client_credentials",
			scope: "viewables:read",
		}),
	})
		.then((res) => res.json())
		.then((value) => {
			const options = {
				document: urn,
				env: "AutodeskProduction",
				accessToken: value.access_token,
				api: "derivativeV2",
			};
			container = document.getElementById("forgeviewer");
			if (container !== null) {
				viewer = new Autodesk.Viewing.GuiViewer3D(container, {
					extensions: ["TreeElementExtension"],
				});
			}
			Autodesk.Viewing.Initializer(options, function onInitialized() {
				addEvents();
				registerExtensions();
				viewer.start();
				Autodesk.Viewing.Document.load(
					urn,
					onDocumentLoadSuccess,
					onDocumentLoadFailure
				);
			});
		});

	function onDocumentLoadSuccess(viewerDocument: Autodesk.Viewing.Document) {
		console.log("document loaded successfully");
		const defaultModel: Autodesk.Viewing.Model = viewerDocument
			.getRoot()
			.getDefaultGeometry();
		viewer.loadDocumentNode(viewerDocument, defaultModel).then(() => {});
	}

	function onDocumentLoadFailure() {
		console.log("failed loading document");
	}

	// Add here your needed Autodesk Events
	const addEvents = () => {
		viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
			loadExtensions();
		});
		viewer.addEventListener(
			Autodesk.Viewing.EXTENSION_LOADED_EVENT,
			(x) => {}
		);
		viewer.addEventListener(
			Autodesk.Viewing.TOOLBAR_CREATED_EVENT,
			(onToolbarCreated) => {
				viewer!.toolbar.setVisible(false);
				viewer!.removeEventListener(
					Autodesk.Viewing.TOOLBAR_CREATED_EVENT,
					onToolbarCreated
				);
			}
		);
	};

	const registerExtensions = () => {
	};

	const loadExtensions = () => {
	};
};
