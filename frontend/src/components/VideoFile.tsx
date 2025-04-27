import React from "react";
import "./VideoFile.css";

interface VideoFeedProps {
  hidden: boolean;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ hidden }) => (
  <div className="container">
    <img
      src={"/api/video_feed"}
      alt="Live camera feed"
      className={`camera ${hidden ? "hidden" : ""}`}
    />
    <div className="mimic" />
  </div>
);

export default VideoFeed;
