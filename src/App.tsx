import React from "react";
import "./index.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import PlayerComponent from "./components/Player";
import ArtistCard from "./components/ArtistCard";
import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import {
  getTokenFromHash,
  logout,
  getAuthorizationUrl,
  getAuthorization,
  getAuthorizationUrlToGetCurrentTrack,
} from "./services/auth";
import {
  getCurrentTrack,
  playTrackById,
  searchTracks,
} from "./services/trackService";
import { Track } from "./types/Track";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [searchResult, setSearchResult] = useState<any[] | null>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playingTrack, setPlayingTrack] = useState<any | null>(null);

  const [player, setPlayer] = useState<any | null>(null);

  useEffect(() => {
    const retrievedToken = getTokenFromHash();
    setToken(retrievedToken);
    // searchArtists();
    getAuthorization();
    getAuthorizationUrlToGetCurrentTrack();
  }, []);
  const token2 =
    "BQAlJ6dr68zCwmAuYLOTP2gFiw3o2QuacUOsmLgx7mFK-hw0QWTqvJ7ijin2mJDxI2-Prncsd8xcrnjcHybqFF6AvMYSS3me2Kep17onCI1f9LPo4LpPvX3q5V5pVqAm-32vb1VP1ijumf050YrbVNv73mpexTLc4uYHByFaEz-4BOHDSKJNrgMTir6pnghQ_R5f9GOnf0631vW3GAKOnY_t";

  // useEffect(() => {
  //   // Player

  //   (window as any).onSpotifyWebPlaybackSDKReady = () => {
  //     console.log("SDK ready!");
  //     const newPlayer = new window.Spotify.Player({
  //       name: "spotify-like-app",
  //       getOAuthToken: (cb: (token: string) => void) => {
  //         cb(token2);
  //       },
  //     });
  //     console.log("Spotify Web Playback SDK is ready!");

  //     newPlayer.addListener("ready", ({ device_id }) => {
  //       console.log("Device ID", device_id);

  //       newPlayer.connect(); // Connect the player once it's ready
  //     });
  //     newPlayer.addListener("player_state_changed", (state) => {
  //       console.log("Player State Changed:", state);
  //     });

  //     setPlayer(newPlayer);
  //     const playTrack = async (trackId: any) => {
  //       try {
  //         // Use the Spotify Web API to get the track information
  //         const response = await fetch(
  //           `https://api.spotify.com/v1/tracks/${trackId}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token2}`,
  //             },
  //           }
  //         );
  //         const trackData = await response.json();

  //         // Extract the track URI
  //         const trackUri = trackData.uri;

  //         // Use the Spotify Web Playback SDK to start playback
  //         await player.resume();
  //         await player.play({
  //           uris: [trackUri],
  //         });

  //         player.connect();
  //         setPlayer(newPlayer);
  //       } catch (error) {
  //         console.error("Error playing track:", error);
  //       }
  //     };

  //     newPlayer.addListener("ready", ({ device_id }) => {
  //       console.log("Device ID", device_id);

  //       // Provide the track ID you want to play
  //       const trackId = "2o002vjoIgeX0Ho2aCWR1N";

  //       // Start playback of the specified track
  //       playTrack(trackId);
  //     });

  //   };
  // }, [token2, setPlayer]);

  // if (player) console.log(player);

  // useEffect(() => {
  //   const initializeSpotifyPlayer = async () => {
  //     // Load the Spotify Web Playback SDK script
  //     const script = document.createElement("script");
  //     script.src = "https://sdk.scdn.co/spotify-player.js";
  //     script.async = true;
  //     document.body.appendChild(script);

  //     // Wait for the Spotify Web Playback SDK to be ready
  //     script.onload = () => {
  //       // Initialize the player
  //       const newPlayer = new window.Spotify.Player({
  //         name: "spotify-like-app",
  //         getOAuthToken: (cb) => {
  //           cb(token2);
  //         },
  //       });

  //       newPlayer.addListener("ready", ({ device_id }) => {
  //         console.log("Device ID", device_id);

  //         // Play a track when the player is ready
  //         playTrack(newPlayer, "YOUR_TRACK_ID_HERE"); // Replace with the track ID you want to play
  //       });

  //       newPlayer.addListener("player_state_changed", (state) => {
  //         console.log("Player State Changed:", state);
  //         // Update UI or perform actions based on the state
  //       });

  //       newPlayer.connect(); // Connect the player once it's ready
  //       setPlayer(newPlayer);
  //     };
  //   };

  //   initializeSpotifyPlayer();
  // }, []);

  const playTrack = async (playerInstance: any, trackId: string) => {
    try {
      // Use the Spotify Web API to get the track information
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );
      const trackData = await response.json();

      // Extract the track URI
      const trackUri = trackData.uri;

      // Use the Spotify Web Playback SDK to start playback
      await playerInstance.togglePlay();

      // After starting playback, play the specified track
      await playerInstance.play({
        uris: [trackUri],
      });
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  useEffect(() => {
    if (player) {
      // Subscribe to player events
      player.addListener("player_state_changed", (state: any) => {
        console.log("Current track:", state.track_window.current_track);
      });
    }
  }, [player]);

  // const getCurrentPlayingTrack = () => {
  //   getCurrentTrack(token);
  // };

  // const playTrackByTrackId = () => {
  //   playTrackById(token, "2o002vjoIgeX0Ho2aCWR1N");
  // };

  const handleSearchResult = (result: any[]) => {
    console.log(result);
    setSearchResult(result);
  };

  const handlePlayPause = () => {
    if (player) {
      // player.addListener("ready", ({ device_id }) => {
      //   console.log("Device ID", device_id);

      //   player.connect(); // Connect the player once it's ready
      // });
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
  const volumeUp = () => {
    // playTrack("2o002vjoIgeX0Ho2aCWR1N");
    player.setVolume(0.5).then(() => {
      console.log("Volume updated!");
    });
  };

  // const playTrack = (track: Track) => {
  //   setCurrentTrack(track);
  // };

  const [isPlaying, setIsPlaying] = useState(false);

  const [test, setTest] = useState(0);
  const setTrack = (track: any) => {
    setTest(test + 1);
    console.log(track);
    setPlayingTrack(track);
  };

  return (
    <div className="flex flex-col h-[100%] ">
      <div className="flex flex-row h-[100%]">
        <div className="w-[241px] min-w-[241px] h-[100%]">
          <Sidebar />
        </div>
        <div className="w-[100%] ">
          <main className="flex-grow ">
            <Navbar onSearchResult={handleSearchResult} />
          </main>
          <div
            className="content h-[85%] flex flex-row"
            style={{ borderRadius: "inherit" }}
          >
            <div className="player-container">
              <PlayerComponent />
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
                    <button onClick={volumeUp}>Volume up</button>
                  </div>
                </div>
              )}
            </div>
            {/* <div onClick={getCurrentPlayingTrack}>show</div>
            <div onClick={playTrackByTrackId}>play track</div> */}
            <div className="overflow-y-scroll max-h-[800px] w-3/4 ">
              <div className="grid items-center grid-cols-7 gap-4 p-4 rounded-lg ">
                <div>#</div>
                <div>name</div>
                <div>artist</div>
                <div>album</div>
                <div>duration</div>
              </div>

              {searchResult
                ? searchResult.map((track, index) => (
                    <div>
                      <div
                        className={`grid items-center grid-cols-6 gap-4 p-4 rounded-lg ${
                          playingTrack?.id === track?.id
                            ? "bg-zinc-900"
                            : "hover:bg-zinc-800"
                        }`}
                        onDoubleClick={() => setTrack(track)}
                      >
                        <div className="flex flex-row items-center gap-4">
                          {index + 1}
                          <div className="rounded-full">
                            <img
                              src={track.album.images[0].url}
                              alt=""
                              className="w-[50px] rounded-lg h-[50px] min-w-[50px] min-h-[50px] "
                            />
                          </div>
                        </div>
                        <div className="truncate max-w-[250px]">
                          {track.name}
                        </div>
                        <div className="truncate max-w-[250px]">
                          {track.artists[0].name}
                        </div>
                        <div className="truncate max-w-[250px]">
                          {track.album.name}
                        </div>
                        <div>
                          {Math.floor(track.duration_ms / 60000)
                            .toString()
                            .padStart(2, "0")}
                          :
                          {((track.duration_ms % 60000) / 1000)
                            .toFixed(0)
                            .toString()
                            .padStart(2, "0")}
                        </div>
                        <div>
                          <button onClick={() => setTrack(track)}>Play</button>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="overflow-y-scroll bg-[#181818] rounded-md max-h-[750px] w-1/4 ">
              {playingTrack ? (
                <div className="mx-4">
                  <div className=" bg-[#181818]  cursor-pointer p-4 shadow-md rounded-md">
                    <img
                      src={
                        playingTrack.album.images[0]
                          ? playingTrack.album.images[0]?.url
                          : "images/artist.png"
                      } // Replace with your default image URL
                      alt={playingTrack.artists[0].name}
                      className="w-96 h-96 rounded-md mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold">
                      {playingTrack.name}
                    </h3>
                    <p className="text-gray-300 mt-1">
                      {playingTrack.artists[0].name}
                    </p>
                  </div>

                  <div className="bg-[#181818] cursor-pointer p-4 shadow-md rounded-md relative group">
                    <img
                      src={"images/artist.png"} // Replace with your default image URL
                      alt={playingTrack.artists[0].name}
                      className="w-96 h-96 rounded-md mx-auto mb-4 opacity-40 hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute bottom-8 left-4 p-2 text-white group-hover:text-zinc-700">
                      <h3 className="text-lg font-semibold">
                        {playingTrack.artists[0].name}
                      </h3>
                      <p className="mt-1 text-white group-hover:text-zinc-700">
                        {playingTrack.artists[0].type}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ zIndex: 5, position: "fixed", bottom: 0, left: 0, right: 0 }}
        className="bg-black h-[100px] w-[100%]"
      >
        {playingTrack ? (
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
                <div className="text-stone-600">
                  {playingTrack.artists[0].name}
                </div>
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
        ) : null}
        {/* <Player /> */}
        {/* <div>{playingTrack && <Player track={playingTrack} />}</div> */}
        <PlayerComponent />
      </div>
    </div>
  );
};

export default App;
