import React from "react";

const VideoFeed: React.FC = () => (
  <div style={{ textAlign: "center", height: "100%", width: "100%" }}>
    <img
      src={"http://127.0.0.1:5000/api/video_feed"}
      alt="Live camera feed"
      style={{
        width: "100%",
        borderRadius: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    />
  </div>
);

export default VideoFeed;
