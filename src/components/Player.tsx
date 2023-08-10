import React, { useEffect, useState } from "react";

const PlayerComponent: React.FC = () => {
  const [player, setPlayer] = useState<any | null>(null);

  useEffect(() => {
    //Player
    const token =
      "BQCb7vKJZkOOIhtTq6KIbIdExY7KHOy1nV09abtLEQTn04fhZX6hFcFHLjTLAjCcHlzaT955wXyXMtUlWPdP0IWqsvPq8xNM9OPW1S3SgLbWykpBrorXh1iZwBGyGgpu2kyDsixpOTlHoTgr2PwyjN8xozvfgcbCYYN-hvwjbG7cLZOILktMUI8tVhFlnBLao95gPJ3L8EkD4gIyB3BzpyCo";

    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      console.log("SDK ready!");
      const newPlayer = new window.Spotify.Player({
        name: "Your App Name",
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token);
        },
      });
      console.log("Spotify Web Playback SDK is ready!");

      setPlayer(newPlayer);

      // Connect to the player
      newPlayer.connect();
    };
  }, []);

  useEffect(() => {
    if (player) {
      // Subscribe to player events
      player.addListener("player_state_changed", (state: any) => {
        console.log("Current track:", state.track_window.current_track);
      });
    }
  }, [player]);

  const handlePlayPause = () => {
    if (player) {
      if (player._options.id === player._options.activeDeviceId) {
        player.togglePlay();
      }
    }
  };

  const handleNext = () => {
    if (player) {
      if (player._options.id === player._options.activeDeviceId) {
        player.nextTrack();
      }
    }
  };

  return (
    <div className="player-container">
      aze
      {player && (
        <div className="player">
          <img
            src="https://via.placeholder.com/100"
            alt="Album Cover"
            className="album-cover"
          />
          <div className="track-info">
            <div className="track-name">Track Name</div>
            <div className="artist-name">Artist Name</div>
          </div>
          <div className="player-controls">
            <button onClick={handlePlayPause}>Play/Pause</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerComponent;
