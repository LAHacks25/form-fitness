import React from "react";
import "./DashBoxes.css";
import VideoFile from "./VideoFile";
import Data from "./Data";

interface DashBoxesProps {
  exercise: string;
}

const DashBoxes: React.FC<DashBoxesProps> = ({ exercise }) => {
  return (
    <div className="dashBoxesContainer">
      <div className="video">
        <p className="selection">{`You are recording ${exercise}`}</p>
        <VideoFile />
      </div>
      <div className="right-box">
        <Data />
      </div>
    </div>
  );
};

export default DashBoxes;
