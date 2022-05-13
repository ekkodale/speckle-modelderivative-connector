import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Client, Stream } from "../api/client";
import Config from "../Config";
import { DashboardState } from "../context/DashboardReducer";

const StreamSelect = () => {
  const client: Client = new Client(Config.BaseURL);
  const [streams, setStreams] = React.useState<Stream[]>();
  const [streamsLoaded, setStreamsLoaded] = useState(false);
  const viewerInitialized: any = useSelector<DashboardState>(
    (state: any) => state.dashboardReducer.viewerInitialized
  );

  if (!streamsLoaded) {
    client
      .streams()
      .then((response: Stream[]) => {
        setStreams((streams) => response);
        setStreamsLoaded(true);
      })
      .catch((error: any) => {
        console.log("Something went wrong: " + error);
      });
  }

  return (
    <div style={{ display: "inline-block", width: "20vw" }}>
      <div className="row">
        <div>
          <label
            className="input-group-text"
            form="streamID"
            style={{ marginRight: "0" }}
          >
            Streams
          </label>
        </div>
        <div className="col" style={{ marginLeft: "-43%" }}>
          <select
            className="custom-select"
            id="streamID"
            style={{ height: "100%" }}
            disabled={!viewerInitialized}
          >
            {streams?.map((stream) => (
              <option value={stream.id}>{stream.id}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default StreamSelect;
