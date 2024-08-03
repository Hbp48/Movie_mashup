import React from 'react';

const YouTubeVideo = ({ videoId }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return <iframe width="560" height="315" src={videoUrl} title="YouTube Video" />;
};

export default YouTubeVideo;
