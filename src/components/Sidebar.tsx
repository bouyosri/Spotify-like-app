import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-black h-[100%] fixed min-w-[241px] w-[241px]">
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
