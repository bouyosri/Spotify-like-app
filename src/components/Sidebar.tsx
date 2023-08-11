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

const Sidebar: React.FC<any> = ({ user }) => {
  const [token, setToken] = useState<string | null>("");
  const [user2, setUser] = useState<any | null>(null);
  const [userPlaylist, setUserPlaylist] = useState<any | null>(null);
  useEffect(() => {
    const retrievedToken = getTokenFromHash();
    setToken(retrievedToken);
    // searchArtists();
    getAuthorization();
    getUser();
  }, [user]);
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
    setUserPlaylist(result);
  };
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  return (
    <div className="bg-[#181818] h-[100%] m-2 rounded-xl fixed min-w-[241px] w-[241px]">
      <div className=" text-white flex flex-col ml-8 ">
        <img
          src="images/spotify-logo.svg"
          alt="Spotify Logo"
          className="w-32 mb-6 mt-8"
        />
        <ul className="text-sm text-gray-400 flex flex-col gap-3">
          <li className=" hover:text-white cursor-pointer gap-3 flex flex-row">
            <a
              href="/"
              className=" hover:text-white cursor-pointer gap-3 flex flex-row"
            >
              <div>
                <img
                  src="images/home.svg"
                  alt="Spotify Logo"
                  className="w-[24px] h-[24px] "
                />
              </div>
              <div className="">Home</div>
            </a>
          </li>
          <li className=" hover:text-white cursor-pointer gap-3 flex flex-row">
            <a
              href="/search"
              className=" hover:text-white cursor-pointer gap-3 flex flex-row"
            >
              <div>
                <img
                  src="images/search.svg"
                  alt="Spotify Logo"
                  className="w-[24px] h-[24px] "
                />
              </div>
              <div className="">Search</div>
            </a>
          </li>
          <li className=" hover:text-white cursor-pointer gap-3 flex flex-row">
            <a
              href="/library"
              className=" hover:text-white cursor-pointer gap-3 flex flex-row"
            >
              <div>
                <img
                  src="images/library.svg"
                  alt="Spotify Logo"
                  className="w-[24px] h-[24px] "
                />
              </div>
              <div className="">Your Library</div>
            </a>
          </li>
        </ul>
        <div className="text-white  mt-10 ">
          <ul className="text-sm text-gray-400 flex flex-col gap-3">
            <li className=" hover:text-white cursor-pointer flex flex-row gap-3 rounded-full">
              <div className="bg-white w-[24px] h-[24px] rounded-sm grid">
                <img
                  src="images/create.svg"
                  alt="Spotify Logo"
                  className="w-[12px] h-[12px] self-center justify-self-center"
                />
              </div>
              <div className="">Create Playlist</div>
            </li>
            <li className=" hover:text-white cursor-pointer flex flex-row gap-3">
              <div className="bg-[#450AF5] w-[24px] h-[24px] rounded-sm grid">
                <img
                  src="images/favourites.svg"
                  alt="Spotify Logo"
                  className="w-[16px] h-[16px] self-center justify-self-center"
                />
              </div>
              <div className="">Liked Songs</div>
            </li>
          </ul>
        </div>
        <div className="text-white  mt-10 ">
          <ul className="text-sm text-gray-400 flex flex-col gap-3">
            {userPlaylist && userPlaylist.length > 0
              ? userPlaylist.map((item: any) => (
                  <a href={"/playlist?id=" + item.id}>
                    <li className=" hover:text-white cursor-pointer flex flex-row gap-3 rounded-full">
                      <div className="bg-white w-[50px] h-[50px] rounded-sm grid">
                        <img
                          src={item.images[0].url}
                          alt="Spotify Logo"
                          className="w-[50px] h-[50px] self-center justify-self-center"
                        />
                      </div>
                      <div className="flex flex-col align-middle self-center">
                        <div className="text-white">{item.name}</div>
                        <div className="">
                          {capitalizeFirstLetter(item.type)}
                        </div>
                      </div>
                    </li>
                  </a>
                ))
              : null}
          </ul>
        </div>
      </div>
      <div className="text-xs text-gray-600 mt-4">
        <a href="#" className="hover:text-white">
          Legal
        </a>
        <a href="#" className="hover:text-white ml-4">
          Privacy Center
        </a>
        <a href="#" className="hover:text-white ml-4">
          Cookies
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
