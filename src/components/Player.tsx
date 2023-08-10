// components/AlbumPlayer.tsx
import React, { useEffect, useState } from "react";

interface PlayerProps {
  playingTrack: any;
}

const Player: React.FC<PlayerProps> = ({ playingTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayPause = () => {
    // if (player) {
    //   if (player._options.id === player._options.activeDeviceId) {
    //     player.togglePlay();
    //   }
    //   player.pause().then(() => {
    //     console.log("Paused!");
    //   });
    // }
  };
  return (
    <div className="player bg-black grid grid-cols-2 items-center">
      <div className="flex flex-row items-center">
        <div className="mt-[6px] ml-[6px]">
          <img
            src={playingTrack.album.images[0].url}
            alt=""
            className="w-[80px] h-[80px] rounded-lg"
          />
        </div>
        <div className="flex flex-col ml-4 align-middle self-center">
          <div className="text-white">{playingTrack.name}</div>
          <div className="text-stone-600">{playingTrack.artists[0].name}</div>
        </div>

        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      <div>
        <audio controls autoPlay={isPlaying}>
          <source src={playingTrack.preview_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default Player;
