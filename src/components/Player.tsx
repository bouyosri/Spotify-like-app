// import React, { useState } from "react";
// import { Track } from "../types/Track";

// const Player: React.FC = () => {
//   return (
//     <div className="bg-black">
//       <div className=" text-white flex flex-col ml-8 h-[100px] ">q</div>
//     </div>
//   );
// };

// export default Player;

// Player.tsx
import React, { useState, useEffect } from "react";

interface PlayerProps {
  track: {
    id: string;
    name: string;
    artist: string;
    preview_url: string;
    duration_ms: number;
  };
}

const Player: React.FC<any> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false); // Pause playback when a new track is loaded
  }, [track.id]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player">
      <h2>Now Playing</h2>
      <p>Track: {track.name}</p>
      <p>Artist: {track.artist}</p>
      <audio controls autoPlay={isPlaying}>
        <source src={track.preview_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default Player;
