import React, { useState } from "react";
import { Client, Stream } from "../api/client";
import Config from "../Config";

const StreamSelect = () => {
  const client: Client = new Client(Config.BaseURL);
  const [streams, setStreams] = React.useState<Stream[]>();
  const [streamsLoaded, setStreamsLoaded] = useState(false);

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
    <div className="row">
      <div className="col">
        <label
          className="input-group-text"
          form="inputGroupSelect01"
          style={{ marginRight: "0" }}
        >
          Streams
        </label>
      </div>
      <div className="col" style={{ marginLeft: "-60%" }}>
        <select
          className="custom-select"
          id="inputGroupSelect01"
          style={{ height: "100%" }}
        >
          {streams?.map((stream) => (
            <option value={stream.id}>{stream.id}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StreamSelect;
