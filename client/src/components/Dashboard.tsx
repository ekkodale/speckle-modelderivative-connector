//Styling
import CSS from "csstype";
//Components
import ForgeViewer from "./ForgeViewer";
//Extensions
import {ModelUrnExtensionHelper} from "./ModelUrnExtensionHelper";
import {MeshExtensionHelper} from "./MeshExtensionHelper";

const forgeViewerContainer: CSS.Properties = {
	paddingLeft: "5vh",
	height: "90%",
};

const forgeViewer: CSS.Properties = {
	border: "1px solid #1F85DE",
	height: "90%",
	position: "relative",
	width: "98%",
};

export const Dashboard = () => {
	const handleModelChange = () => {
		const inputValue: string = (document.getElementById("modelUrn") as HTMLInputElement).value;
		ModelUrnExtensionHelper.getInstance().loadNewModel(inputValue);
	};

	const testFunc = () => {
		MeshExtensionHelper.getInstance().testFunc();
	};

	return (
		<div className="container-fluid" style={{height: "100vh"}}>
			<div className="row" style={{height: "10%"}}>
				<div className="col-sm-3">
					<div className="container" style={{marginTop: "5%"}}>
						<div className="input-group mb-3">
							<input type="text" className="form-control" id="modelUrn" placeholder="Model URN" aria-label="ModelUrn" aria-describedby="basic-addon2" />
							<div className="input-group-append">
								<button className="btn btn-outline-secondary" type="button" onClick={() => handleModelChange()}>
									Change
								</button>
							</div>
						</div>
					</div>
					<button className="btn btn-primary" type="button" onClick={() => testFunc()}>
					Change
				</button>
				</div>

				<div className="col-sm-9">
					<h1 className="h1" style={{marginTop: "1%"}}>
						Title
					</h1>
				</div>
			</div>
			<div className="row" style={forgeViewerContainer}>
				<div className="col-sm-12 px-0" style={forgeViewer}>
					<ForgeViewer urn={"urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6c3BlY2tsZWhhY2thdGhvbi9yYWNfYmFzaWNfc2FtcGxlX3Byb2plY3QucnZ0"} />
				</div>
			</div>
		</div>
	);
};
export default Dashboard;
