// import React from "react";
// import "./DashBoxes.css";
// import VideoFile from "./VideoFile";
// import Data from "./Data";

// interface DashBoxesProps {
//   exercise: string;
//   hidden: boolean;
// }

// const DashBoxes: React.FC<DashBoxesProps> = ({ exercise, hidden }) => {
//   return (
//     <div className={`dashBoxesContainer`}>
//       <div className="video">
//         <p className="selection">{`You are recording ${exercise}`}</p>
//         <VideoFile hidden={hidden} />
//         <button
//           className={`stopButton ${hidden ? "hidden" : ""}`}
//           onClick={() => {
//             fetch("http://127.0.0.1:5000/api/stop_camera", { method: "GET" })
//               .then((response) => response.json())
//               .then((data) => console.log(data.message));
//           }}
//         >
//           {" "}
//           End Recording
//         </button>
//       </div>
//       <div className={`right-box ${hidden ? "hidden" : ""}`}>
//         <Data />
//       </div>
//     </div>
//   );
// };

// export default DashBoxes;

import React, { useState } from "react";
import "./DashBoxes.css";
import VideoFile from "./VideoFile";
import Data from "./Data";

interface DashBoxesProps {
  exercise: string;
  hidden: boolean;
}

const DashBoxes: React.FC<DashBoxesProps> = ({ exercise, hidden }) => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    fetch("http://127.0.0.1:5000/api/stop_camera", { method: "GET" })
      .then((response) => response.json())
      .then((data) => console.log(data.message));
    setIsRecording(false);
  };

  return (
    <div className={`dashBoxesContainer`}>
      <div className="video">
        <p className="selection">{`You are recording ${exercise}`}</p>
        {!isRecording ? (
          <button className="startButton" onClick={startRecording}>
            Start Recording
          </button>
        ) : (
          <VideoFile hidden={false} />
        )}
        <div className={`buttonRow ${hidden ? "hidden" : ""}`}>
          {isRecording && (
            <button className="stopButton" onClick={stopRecording}>
              End Recording
            </button>
          )}
        </div>
      </div>
      <div className={`right-box ${hidden ? "hidden" : ""}`}>
        <Data />
      </div>
    </div>
  );
};

export default DashBoxes;
