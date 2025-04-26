import React from "react";
import "./DashBoxes.css";
import VideoFile from "./VideoFile";

const DashBoxes: React.FC = () => {
  return (
    <div className="container">
      <div className="middle-row">
        <div className="middle-column">
          <div className="top-box">
            <VideoFile />
          </div>
          <div className="bottom-box"></div>
        </div>
        <div className="right-box"></div>
      </div>
    </div>
  );
};

export default DashBoxes;
