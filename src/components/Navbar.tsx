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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  //

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
    setIsDropdownOpen(false);
  };
  const getUser = async () => {
    const result = await getUserProfile(token);
    setUser(result);
    // console.log(result);
    getUserPlaylist();
  };
  const getUserPlaylist = async () => {
    var result = [];
    if (user) result = await getUserPlaylists(token, user.id);
    // setUser(result);
    // console.log(result);
  };

  const handleSearchChange = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <div className="text-white">
      <div className="bg-zinc-900 w-[98%] grid grid-cols-3 gap-1 h-16 mx-4 mt-2 rounded-xl">
        {/* Arrows */}
        <div className=" flex flex-row gap-3 ml-4 self-center ">
          <div
            onClick={() => navigate(-1)}
            className="bg-black w-[30px] h-[30px] rounded-full cursor-pointer"
          >
            <div className="mt-[6px] ml-[6px]">
              <img
                src="images/arrow-back.svg"
                alt=""
                className="w-[16px] h-[16px] "
              />
            </div>
          </div>
          <div
            onClick={() => navigate(1)}
            className="bg-black w-[30px] h-[30px] rounded-full cursor-pointer"
          >
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
        {token ? (
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
                className="w-[250px] text-black"
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
        ) : (
          <div className="self-center">Login to search</div>
        )}
        <div className="justify-self-end self-center">
          {!token ? (
            <div className=" flex flex-row ">
              <div className="text-gray-300 px-8 py-3 rounded-full">
                <a href={getAuthorizationUrl()}>Sign up</a>
              </div>
              <div className="bg-white text-black px-8 py-3 rounded-full">
                <a href={getAuthorizationUrl()}>Log in</a>
              </div>
            </div>
          ) : (
            // <div className="bg-white px-8 py-3 rounded-full">
            //   <button onClick={handleLogout}>{user.display_name}</button>
            // </div>
            <div className="relative inline-block text-left h-5">
              <div>
                <span className="rounded-md shadow-sm">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full h-[65px] rounded-md border  px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <img
                      src={user && user.images ? user.images[0].url : null} // Replace with your default image URL
                      alt="user"
                      className="w-[50px] h-[50px] rounded-full mx-auto mb-4  transition-opacity"
                    />
                    <svg
                      className="-mr-1 ml-2 h-5 w-5 "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </div>

              {isDropdownOpen && (
                <div
                  className="origin-top-right text-center text-white absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-gray-700 divide-y divide-gray-700"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1" role="none">
                    {user ? user.display_name : null}
                    <button
                      className="w-full text-center text-left px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
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
        <h2> </h2>
      )}
    </div>
  );
};

export default Navbar;
