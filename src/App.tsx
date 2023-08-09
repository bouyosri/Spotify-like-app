import React from "react";
import "./index.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import {
  getTokenFromHash,
  logout,
  getAuthorizationUrl,
  getAuthorization,
} from "./services/auth";
import { searchArtists } from "./services/artistService";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [searchResult, setSearchResult] = useState<any[] | null>([]);

  useEffect(() => {
    const retrievedToken = getTokenFromHash();
    setToken(retrievedToken);
    // searchArtists();
    getAuthorization();
  }, []);

  const handleLogout = () => {
    logout();
    setToken("");
  };

  const handleSearchResult = (result: any[]) => {
    console.log(result);
    setSearchResult(result);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
    searchArtists(searchKey, token);
    // setArtists(searchArtists(searchKey, token))
  };

  return (
    <div className="flex flex-col h-[100%] ">
      <div className="flex flex-row h-[100%]">
        <div className="w-[241px] h-[100%]">
          <Sidebar />
        </div>
        <div className="w-[100%]">
          <main className="flex-grow ">
            <Navbar onSearchResult={handleSearchResult} />
          </main>
          <div>dddd</div>
        </div>
      </div>
      <div>
        <Player />
      </div>
    </div>
  );
};

export default App;
