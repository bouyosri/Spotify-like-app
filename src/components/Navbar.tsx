import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "react-query";
import {
  getTokenFromHash,
  logout,
  getAuthorizationUrl,
  getAuthorization,
} from "../services/auth";
import { searchArtists } from "../services/artistService";
import { searchTracks } from "../services/trackService";
import { useLocation } from "react-router-dom";
import { getUserProfile } from "../services/userService";
import { getUserPlaylists } from "../services/playlistService";

const Navbar: React.FC<any> = ({ user }) => {
  const [token, setToken] = useState<string | null>("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const [user2, setUser] = useState<any | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  // setSearchKey(query)
  useEffect(() => {
    const retrievedToken = getTokenFromHash();
    setToken(retrievedToken);
    // searchArtists();
    getAuthorization();
    getUser();
  }, [user]);

  const handleLogout = () => {
    logout();
    setToken("");
  };
  const getUser = async () => {
    const result = await getUserProfile(token);
    setUser(result);
    console.log(result);
    getUserPlaylist();
  };
  const getUserPlaylist = async () => {
    var result = [];
    if (user) result = await getUserPlaylists(token, user.id);
    // setUser(result);
    console.log(result);
  };

  const handleSearchChange = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <div>
      <div className="bg-zinc-900 w-[98%] grid grid-cols-3 gap-1 h-16 mx-4 mt-2 rounded-xl">
        {/* Arrows */}
        <div className=" flex flex-row gap-3 ml-4 self-center ">
          <div className="bg-black w-[30px] h-[30px] rounded-full cursor-pointer">
            <div className="mt-[6px] ml-[6px]">
              <img
                src="images/arrow-back.svg"
                alt=""
                className="w-[16px] h-[16px] "
              />
            </div>
          </div>
          <div className="bg-black w-[30px] h-[30px] rounded-full cursor-pointer">
            <div className="mt-[6px] ml-[6px]">
              <img
                src="images/arrow-next.svg"
                alt=""
                className="w-[16px] h-[16px] "
              />
            </div>
          </div>
        </div>
        {/* Search Bar */}
        <div className=" flex flex-row gap-3 ml-[-100px] self-center bg-white px-8 py-3 rounded-full w-[350px]">
          <button className="mt-[0px] ml-[0px]" onClick={handleSearchChange}>
            <img
              src="images/search-icon.svg"
              alt=""
              className="w-[24px] h-[24px] "
            />
          </button>
          <div className="">
            <input
              className="w-[250px]"
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={handleSearchChange}
              // value={searchKey}
              // Call the function on input change
            />
          </div>
        </div>
        <div className="justify-self-end self-center">
          {!token ? (
            <div className=" flex flex-row ">
              <div className="text-gray-300 px-8 py-3 rounded-full">
                <a href={getAuthorizationUrl()}>Sign up</a>
              </div>
              <div className="bg-white px-8 py-3 rounded-full">
                <a href={getAuthorizationUrl()}>Log in</a>
              </div>
            </div>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
      {token ? (
        // <form onSubmit={searchArtists}>
        //     <input type="text" onChange={e => setSearchKey(e.target.value)}/>
        //     <button type={"submit"}>Search</button>
        // </form>
        <div></div>
      ) : (
        <h2>Please login</h2>
      )}
    </div>
  );
};

export default Navbar;
