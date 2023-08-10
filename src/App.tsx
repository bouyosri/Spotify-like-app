import React from "react";
import "./index.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ArtistCard from "./components/ArtistCard";
import Player from "./components/Player";
import { useEffect, useState } from "react";
import HomePage from "./pages/homePage";
import SearchPage from "./pages/searchPage";
import LibraryPage from "./pages/libraryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { useQuery } from "react-query";
import {
  getTokenFromHash,
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
    "BQAdRat4OTXK2blRuqN86hldBnKkCkl52LC__IkA4M62xvqMtRQAW5XI0kzPPyZUod9EvIY4CQNXhqUzL1yTsg_3vpbxmjyrMgpvV0IJyXF2RD2Exw5LoxeOwaIsPyMU0V_zJvNAcdKBjvv0yGtSorTM_3JB_EEl6J2_4ycp-9zF9aNdkVxeWdMbp7mk53I3NdI6AY0u-K_-EeoFS_oBU4YA";
  useEffect(() => {
    // Player

    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      const newPlayer = new window.Spotify.Player({
        name: "spotify-like-app",
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token2);
        },
      });
      console.log("Spotify Web Playback SDK is ready!");

      newPlayer.addListener("ready", ({ device_id }) => {
        newPlayer.connect(); // Connect the player once it's ready
      });
      newPlayer.addListener("player_state_changed", (state) => {
        console.log("Player State Changed:", state);
      });

      setPlayer(newPlayer);
    };
  }, []);

  const initializeSpotifyPlayer = async (track: any) => {
    // Load the Spotify Web Playback SDK script
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    script.onload = () => {
      // Initialize the player
      const newPlayer = new window.Spotify.Player({
        name: "spotify-like-app",
        getOAuthToken: (cb) => {
          cb(token2);
        },
      });
      newPlayer.addListener("ready", async ({ device_id }) => {
        console.log("The Web Playback SDK is ready to play music!");
        console.log("Device ID", device_id);
      });
      newPlayer.addListener("ready", async ({ device_id }) => {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/tracks/${track.id}`,
            {
              headers: {
                Authorization: `Bearer ${token2}`,
              },
            }
          );
          const trackData = await response.json();
          const trackUri = trackData.uri;

          const playResponse = await fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token2}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                uris: [trackUri],
              }),
            }
          );

          if (playResponse.status === 204) {
            console.log("Track is playing!");
          } else {
            console.error("Failed to play track.");
          }
        } catch (error) {
          console.error("Error playing track:", error);
        }
        try {
          // Fetch track data using the track ID
          const response = await fetch(
            `https://api.spotify.com/v1/tracks/${track.id}`,
            {
              headers: {
                Authorization: `Bearer ${token2}`,
              },
            }
          );
          const trackData = await response.json();

          // Extract the track URI
          const trackUri = trackData.uri;

          // Use the Spotify Web Playback SDK to play the track
          setPlayer(newPlayer);
          console.log(player);
          await player.play({
            uris: [trackUri],
          });

          console.log("Track is playing!");
        } catch (error) {
          console.error("Error playing track:", error);
        }
      });
      setPlayer(newPlayer);

      player.getCurrentState().then((state: any) => {
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          return;
        }

        var current_track = state.track_window.current_track;
        var next_track = state.track_window.next_tracks[0];

        console.log("Currently Playing", current_track);
        console.log("Playing Next", next_track);
      });

      newPlayer.connect();
    };

    script.onerror = () => {
      console.error("Failed to load Spotify Web Playback SDK.");
    };

    // Append the script to the document body to start loading
    document.body.appendChild(script);
  };

  if (player) {
    player.addListener("player_state_changed", (state: any) => {
      console.log("Player State Changed:", state);

      if (state && state.track_window && state.track_window.current_track) {
        console.log("A track is currently playing.");
      } else {
        console.log("No track is currently playing.");
      }

      // Update UI or perform actions based on the state
    });
  }
  const playAlbumTrack = async (albumUri: string, position: number) => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/play",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token2}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            context_uri: "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
            offset: {
              position: position,
            },
            position_ms: 0,
          }),
        }
      );

      if (response.ok) {
        console.log("Album track is playing!");
      } else {
        console.error("Failed to play album track");
      }
    } catch (error) {
      console.error("Error playing album track:", error);
    }
  };

  // Usage
  const albumUri = "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr"; // Replace with your album URI
  const position = 5; // Replace with the desired position

  playAlbumTrack(albumUri, position);

  const playTrack = async (playerInstance: any, track: string) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/` + track,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );
      const trackData = await response.json();

      const trackUri = trackData.uri;

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

  const handleSearchResult = (result: any[]) => {
    // console.log(result);
    setSearchResult(result);
  };
  const handleSelectTrack = (track: any) => {
    // console.log("from app", track);
    setPlayingTrack(track);
  };

  const handlePlayPause = () => {
    if (player) {
      if (player._options.id === player._options.activeDeviceId) {
        player.togglePlay();
      }
      player.pause().then(() => {
        console.log("Paused!");
      });
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
    player.setVolume(1).then(() => {
      console.log("Volume updated!");
    });
  };

  const [test, setTest] = useState(0);
  const setTrack = (track: any) => {
    initializeSpotifyPlayer(track);
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
          <main className="flex-grow "></main>
          <Router>
            <Navbar onSearchResult={handleSearchResult} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/search"
                element={
                  <SearchPage
                    token={token}
                    onSearchResult={handleSearchResult}
                    onSelectTrack={handleSelectTrack}
                  />
                }
              />
              <Route path="/library" element={<LibraryPage />} />
            </Routes>
          </Router>
        </div>
      </div>

      <div
        style={{ zIndex: 5, position: "fixed", bottom: 0, left: 0, right: 0 }}
        className="bg-black h-[100px] w-[100%]"
      >
        {playingTrack ? <Player playingTrack={playingTrack} /> : null}
      </div>
    </div>
  );
};

export default App;
