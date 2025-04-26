import React from 'react';

const VideoFeed: React.FC = () => (
  <div style={{ textAlign: 'center' }}>
    <h2>Live Camera</h2>
    <img
      src={"http://127.0.0.1:5000/api/video_feed"}
      alt="Live camera feed"
      style={{ width: '100%', maxWidth: 700, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
    />
    <p style={{ color: '#666', marginTop: '.5rem' }}>
      If blank, make sure Flask is running on port 5000.
    </p>
  </div>
);

export default VideoFeed;
