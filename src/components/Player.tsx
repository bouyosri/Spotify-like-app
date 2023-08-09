import React, { useState, useEffect } from "react";
import { Track } from "../types/Track";

interface PlayerProps {
  track: Track; // Define your Track type
}

const Player: React.FC<PlayerProps> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      // Start playing the track
    } else {
      // Pause the track
    }
  }, [isPlaying]);

  return (
    <div className="music-player">
      <div className="bg-black">
        <div className=" text-white flex flex-col ml-8 h-[100px] ">q</div>
      </div>
      <div className="track-info">
        <h2>{track.name}</h2>
        <p>{track.artist}</p>
      </div>
      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        {/* Add skip and other controls */}
      </div>
    </div>
  );
};

export default Player;
