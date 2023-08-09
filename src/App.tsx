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
import { searchArtists } from "./services/artistService";
import { getCurrentTrack, playTrackById } from "./services/trackService";
import { Track } from "./types/Track";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [searchResult, setSearchResult] = useState<any[] | null>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

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
            <div className="grid xl:grid-cols-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {searchResult
                ? searchResult.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <div>{currentTrack && <Player track={currentTrack} />}</div>
    </div>
  );
};

export default App;
