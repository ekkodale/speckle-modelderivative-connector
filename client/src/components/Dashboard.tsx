//Styling
import CSS from "csstype";
//Components
import ForgeViewer from "./ForgeViewer";
import StreamSelect from "./StreamSelect";
//Extensions
import { ModelUrnExtensionHelper } from "./ModelUrnExtensionHelper";
import { MeshExtensionHelper } from "./MeshExtensionHelper";
//Redux
import { DashboardState } from "../context/DashboardReducer";
import { useSelector } from "react-redux";

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
    const inputValue: string = (
      document.getElementById("modelUrn") as HTMLInputElement
    ).value;
    ModelUrnExtensionHelper.getInstance().loadNewModel(inputValue);
  };
  const viewerInitialized: any = useSelector<DashboardState>(
    (state: any) => state.dashboardReducer.viewerInitialized
  );

  const commitFunc = () => {
    const selectValue: string = (
      document.getElementById("streamID") as HTMLSelectElement
    ).value;
    MeshExtensionHelper.getInstance().commitFunc(selectValue);
  };

  const commitFuncc = () => {
    const selectValue: string = (
      document.getElementById("streamID") as HTMLSelectElement
    ).value;
    MeshExtensionHelper.getInstance().commitFuncc(selectValue);
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row" style={{ height: "15%", paddingTop: "2%" }}>
        <div className="col-sm-3">
          <div className="container" style={{ marginLeft: "5%" }}>
            <div className="input-group mb-3">
              <input
                type="text"
                disabled={!viewerInitialized}
                className="form-control"
                id="modelUrn"
                placeholder="Model URN"
                aria-label="ModelUrn"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  disabled={!viewerInitialized}
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => handleModelChange()}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 px-0">
          <div className="container">
            <StreamSelect />
            <div style={{ display: "inline-block" }}>
              <button
                className="btn btn-outline-primary waves-effect"
                type="button"
                style={{
                  display: "inline-block",
                  width: "8vw",
                  height: "38px",
                }}
                onClick={() => commitFunc()}
                disabled={!viewerInitialized}
              >
                Convert
                <i className="bi bi-download" style={{ float: "right" }}></i>
              </button>
              <button
                className="btn btn-outline-primary waves-effect"
                type="button"
                style={{
                  display: "inline-block",
                  width: "8vw",
                  height: "38px",
                }}
                onClick={() => commitFuncc()}
                disabled={!viewerInitialized}
              >
                Commit
                <i className="bi bi-check-lg" style={{ float: "right" }}></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <h1
            className="h3"
            style={{
              textDecoration: "underline",
              textDecorationColor: "#0080ff",
              color: "#3c414f",
            }}
          >
            Speckle Model Derivative Connector
          </h1>
        </div>
      </div>
      <div className="row" style={forgeViewerContainer}>
        <div className="col-sm-12 px-0" style={forgeViewer}>
          <ForgeViewer
            urn={
              "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6c3BlY2tsZWhhY2thdGhvbi9yYWNfYmFzaWNfc2FtcGxlX3Byb2plY3QucnZ0"
            }
          />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
