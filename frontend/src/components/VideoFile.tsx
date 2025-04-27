import React from "react";

interface VideoFeedProps {
  hidden: boolean;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ hidden }) => (
  <div
    style={{
      textAlign: "center",
      height: "90%",
      width: "100%",
      marginTop: 25,
      padding: 0,
    }}
  >
    <img
      src={"/api/video_feed"}
      alt="Live camera feed"
      style={{
        width: "100%",
        borderRadius: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        margin: 0,
        padding: 0,
        display: hidden ? "none" : "block",
      }}
    />
  </div>
);

export default VideoFeed;
