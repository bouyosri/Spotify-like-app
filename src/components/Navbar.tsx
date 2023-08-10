import React from "react";
import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import {
  getTokenFromHash,
  logout,
  getAuthorizationUrl,
  getAuthorization,
} from "../services/auth";
import { searchArtists } from "../services/artistService";
import { searchTracks } from "../services/trackService";

interface NavbarProps {
  onSearchResult: (result: any[]) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchResult }) => {
  const [token, setToken] = useState<string | null>("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

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

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchKey = event.target.value;
    setSearchKey(newSearchKey);

    try {
      // const result = await searchArtists(newSearchKey, token);
      const result = await searchTracks(newSearchKey, token);
      onSearchResult(result); // Send the result to the parent component
    } catch (error) {
      console.error("Error searching artists:", error);
    }
  };
  return (
    <div>
      <div className="bg-zinc-900 w-[100%] grid grid-cols-3 gap-1 h-14">
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
          <div className="mt-[0px] ml-[0px]">
            <img
              src="images/search-icon.svg"
              alt=""
              className="w-[24px] h-[24px] "
            />
          </div>
          <div className="">
            <input
              className="w-[250px]"
              type="text"
              placeholder="What do you want to listen to?"
              value={searchKey}
              onChange={handleSearchChange} // Call the function on input change
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
