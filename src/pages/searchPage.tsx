import React from "react";
import "../index.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchArtists } from "../services/artistService";
import { searchTracks } from "../services/trackService";
import ArtistCard from "../components/ArtistCard";

const SearchPage: React.FC<any> = ({
  token,
  onSearchResult,
  onSelectTrack,
}) => {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [searchResultsTracks, setSearchResultsTracks] = useState<any[] | null>(
    []
  );
  const [searchResultsArtists, setSearchResultsArtists] = useState<
    any[] | null
  >([]);
  // const [searchResults, setSearchResults] = useState([]);
  // const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playingTrack, setPlayingTrack] = useState<any | null>(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = new URLSearchParams(location.search).get("query") || "";
  const [searchType, setSearchType] = useState("all"); // Default to searching for tracks

  const [player, setPlayer] = useState<any | null>(null);

  useEffect(() => {
    if (query) {
      // onSearchResult(searchResults);

      handleSearchChange();
    }
  }, [query]);

  const handleSearchChange = async (search?: string) => {
    try {
      const resultArtists = await searchArtists(query, token);
      const resultTracks = await searchTracks(query, token);
      onSearchResult(resultTracks); // Send the result to the parent component
      if (search) {
        //tracks
        if (search == "all") setSearchResultsTracks(resultTracks.slice(0, 5));
        else if (search == "track") setSearchResultsTracks(resultTracks);
        else setSearchResultsTracks([]);
        //artists
        if (search == "all") setSearchResultsArtists(resultArtists.slice(0, 5));
        else if (search == "artist") setSearchResultsArtists(resultArtists);
        else setSearchResultsArtists([]);
      } else {
        setSearchResultsTracks(resultTracks);
        setSearchResultsArtists(resultArtists);
      }

      console.log("searchResultsArtists", searchResultsArtists);
      console.log("earchResultstracks", searchResultsTracks);
      console.log("type", search);
    } catch (error) {
      console.error("Error searching artists:", error);
    }
  };
  const token2 =
    "BQAdRat4OTXK2blRuqN86hldBnKkCkl52LC__IkA4M62xvqMtRQAW5XI0kzPPyZUod9EvIY4CQNXhqUzL1yTsg_3vpbxmjyrMgpvV0IJyXF2RD2Exw5LoxeOwaIsPyMU0V_zJvNAcdKBjvv0yGtSorTM_3JB_EEl6J2_4ycp-9zF9aNdkVxeWdMbp7mk53I3NdI6AY0u-K_-EeoFS_oBU4YA";
  // useEffect(() => {
  //   // Player

  //   (window as any).onSpotifyWebPlaybackSDKReady = () => {
  //     const newPlayer = new window.Spotify.Player({
  //       name: "spotify-like-app",
  //       getOAuthToken: (cb: (token: string) => void) => {
  //         cb(token2);
  //       },
  //     });
  //     console.log("Spotify Web Playback SDK is ready!");

  //     newPlayer.addListener("ready", ({ device_id }) => {
  //       newPlayer.connect(); // Connect the player once it's ready
  //     });
  //     newPlayer.addListener("player_state_changed", (state) => {
  //       console.log("Player State Changed:", state);
  //     });

  //     setPlayer(newPlayer);
  //   };
  // }, []);
  const handleSearchTypeChange = (event: any) => {
    setSearchType(event.target.value);
    console.log(event.target.value);
    handleSearchChange(event.target.value);
  };

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
    onSelectTrack(track);
  };
  return (
    <div
      className="content h-[85%] flex flex-row m-2 rounded-xl"
      style={{ borderRadius: "inherit" }}
    >
      <div className="player-container">
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
      <div className="overflow-y-scroll max-h-[800px] w-3/4 mx-4 ">
        <select
          className="bg-black text-white border border-white py-2 px-4 rounded appearance-none"
          value={searchType}
          onChange={handleSearchTypeChange}
        >
          <option value="all">All</option>
          <option value="track">Tracks</option>
          <option value="artist">Artists</option>
        </select>

        <div>
          {searchResultsArtists && searchResultsArtists?.length > 0 ? (
            <div className="text-2xl my-6">Artists</div>
          ) : null}
          <div className="grid xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {searchResultsArtists
              ? searchResultsArtists.map((artist, index) => (
                  <div>
                    <ArtistCard artist={artist} />
                  </div>
                ))
              : null}
          </div>
          {searchResultsTracks && searchResultsTracks?.length > 0 ? (
            <div className="text-2xl my-6">Tracks</div>
          ) : null}
          <div className="overflow-y-scroll max-h-[800px]  ">
            {searchResultsTracks
              ? searchResultsTracks.map((track, index) => (
                  <div>
                    <div
                      className={`grid items-center grid-cols-5 gap-4 p-4 rounded-lg ${
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
                      <div className="truncate max-w-[250px]">{track.name}</div>
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
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
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
              <h3 className="text-lg font-semibold">{playingTrack.name}</h3>
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
  );
};

export default SearchPage;
