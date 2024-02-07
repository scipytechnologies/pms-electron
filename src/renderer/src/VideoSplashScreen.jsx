import React, { useRef, useEffect } from 'react';
import './VideoSplashScreen.css'; // Import CSS file for styling

const VideoSplashScreen = ({ videoSrc, onVideoEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoEnd = () => {
      if (onVideoEnd) {
        onVideoEnd();
      }
    };

    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, [onVideoEnd]);

  return (
    <div className="video-splash-screen">
      <video ref={videoRef} autoPlay muted>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoSplashScreen;
