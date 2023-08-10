import React from "react";
import "./index.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
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

  useEffect(() => {
    const retrievedToken = getTokenFromHash();
    setToken(retrievedToken);
    // searchArtists();
    getAuthorization();
    getAuthorizationUrlToGetCurrentTrack();
  }, []);

  const handleLogout = () => {
    logout();
    setToken("");
  };
  const getCurrentPlayingTrack = () => {
    getCurrentTrack(token);
  };

  const playTrackByTrackId = () => {
    playTrackById(token, "2o002vjoIgeX0Ho2aCWR1N");
  };

  const handleSearchResult = (result: any[]) => {
    console.log(result);
    setSearchResult(result);
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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
          <div className="content h-[90%]" style={{ borderRadius: "inherit" }}>
            {/* Render search results here */}
            <div onClick={getCurrentPlayingTrack}>show</div>
            <div onClick={playTrackByTrackId}>play track</div>
            {/* <div className="grid xl:grid-cols-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {searchResult
                ? searchResult.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))
                : null}
            </div> */}
            <div className="!h-[350px] !max-h-[350px] ">
              <tr>
                <th>#</th>
                <th>name</th>
                <th>artist</th>
                <th>album</th>
                <th>duration</th>
              </tr>

              {searchResult
                ? searchResult.map((track, index) => (
                    <div>
                      <div
                        className={`grid items-center grid-cols-7 gap-4 p-4 rounded-lg ${
                          playingTrack.id === track.id
                            ? "bg-zinc-900"
                            : "hover:bg-zinc-800"
                        }`}
                        onDoubleClick={() => setTrack(track)}
                      >
                        <div>{index + 1}</div>
                        <div className="rounded-full">
                          <img
                            src={track.album.images[0].url}
                            alt=""
                            className="w-[50px] rounded-lg h-[50px] min-w-[50px] min-h-[50px] "
                          />
                        </div>
                        <div>{track.name}</div>
                        <div>{track.artists[0].name}</div>
                        <div>{track.album.name}</div>
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
        <div>{playingTrack && <Player track={playingTrack} />}</div>
      </div>
    </div>
  );
};

export default App;
