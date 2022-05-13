export interface DashboardState {
	viewerInitialized: boolean;
}

const initialState = {
	viewerInitialized: false,
};

type InitializeViewer = {type: "VIEWER_INITIALIZED"; payload: boolean};
type Action = InitializeViewer;

export const dashboardReducer = (state: DashboardState = initialState, action: Action) => {
	switch (action.type) {
		case "VIEWER_INITIALIZED":
			return {
				viewerInitialized: action.payload,
			};
		default: {
			return state;
		}
	}
};
