import React from "react";
import "./DashBoxes.css";
import VideoFile from "./VideoFile";

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
      <div className="right-box"></div>
    </div>
  );
};

export default DashBoxes;
