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
import ArtistPage from "./pages/artistPage";
import PlaylistPage from "./pages/playlistPage";
import { getUserProfile } from "./services/userService";
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
  const [user, setUser] = useState<any | null>(null);

  const [player, setPlayer] = useState<any | null>(null);

  useEffect(() => {
    const retrievedToken = getTokenFromHash();
    setToken(retrievedToken);
    if (token) {
      getUser();
    }
  }, [token]);

  const getUser = async () => {
    const result = await getUserProfile(token);
    setUser(result);
    console.log(result);
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

  return (
    <div className="flex flex-col h-[100%] bg-black ">
      <div className="flex flex-row h-[100%]">
        <Router>
          <div className="w-[241px] min-w-[241px] h-[100%]">
            <Sidebar user={user} />
          </div>
          <div className="w-[100%] ">
            <main className="flex-grow "></main>

            <Navbar onSearchResult={handleSearchResult} user={user} />
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
              <Route
                path="/artist"
                element={
                  <ArtistPage token={token} onSelectTrack={handleSelectTrack} />
                }
              />
              <Route
                path="/playlist"
                element={
                  <PlaylistPage
                    token={token}
                    onSelectTrack={handleSelectTrack}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
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
