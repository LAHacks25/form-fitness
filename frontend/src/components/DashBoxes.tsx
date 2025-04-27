import React from "react";
import "./DashBoxes.css";
import VideoFile from "./VideoFile";
import Data from "./Data";

interface DashBoxesProps {
  exercise: string;
  hidden: boolean;
}

const DashBoxes: React.FC<DashBoxesProps> = ({ exercise, hidden }) => {
  return (
    <div className={`dashBoxesContainer`}>
      <div className="video">
        <p className="selection">{`You are recording ${exercise}`}</p>
        <VideoFile hidden={hidden} />
        <button className={`stopButton ${hidden ? "hidden" : ""}`}>
          End Recording
        </button>
      </div>
      <div className={`right-box ${hidden ? "hidden" : ""}`}>
        <Data />
      </div>
    </div>
  );
};

export default DashBoxes;
