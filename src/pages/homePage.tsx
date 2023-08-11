import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getArtistById,
  getArtistRelated,
  getArtistTopTracks,
} from "../services/artistService";
import { getUserTopArtists, getUserTopTracks } from "../services/userService";
import ArtistCard from "../components/ArtistCard";

const HomePage: React.FC<any> = ({ token, onSelectTrack }) => {
  const location = useLocation();
  const artistId = new URLSearchParams(location.search).get("id") || "";
  const [artist, setArtist] = useState<any | null>(null);
  const [topSongs, setTopSongs] = useState<any | null>(null);
  const [topArtists, setTopArtists] = useState<any | null>(null);
  const [similarArtists, setSimilarArtists] = useState<any | null>(null);
  const [playingTrack, setPlayingTrack] = useState<any | null>(null);
  const [isLoadingSimilarArtists, setIsLoadingSimilarArtists] = useState(true);
  useEffect(() => {
    if (token) fetchTopSongsAndTopArtists();
  }, [token]);

  const fetchTopSongsAndTopArtists = async () => {
    try {
      const resultArtists = await getUserTopArtists(token);
      const resultTracks = await getUserTopTracks(token);
      // var artists = resultSongs.items;
      if (resultArtists) {
        setTopArtists(resultArtists);
        setTopSongs(resultTracks);
      }
      if (resultTracks) {
        setTopSongs(resultTracks);
        // console.log("fetched", topSongs);
      }
      // if (resultArtists) {
      //   setSimilarArtists(resultArtists);
      //   setIsLoadingSimilarArtists(false);
      // }
    } catch (error) {
      console.error("Error searching tracks:", error);
    }
  };

  const setTrack = async (track: any) => {
    const resultSongs = await getUserTopTracks(token);
    if (resultSongs) setTopSongs(resultSongs);
    onSelectTrack(track);
  };

  return (
    <div className="w-[98%] h-[90%] bg-[#181818] text-white m-4 rounded-xl overflow-y-scroll max-h-[98%]">
      {topArtists ? (
        <div className="bg-[#202020]  p-4 shadow-md ">
          {topArtists && topArtists?.length > 0 ? (
            <div className="text-2xl text-white my-6">Top Artists Today</div>
          ) : (
            <div></div>
          )}
          <div className="overflow-y-scroll max-h-[800px]">
            {topArtists && topArtists?.length > 0 ? (
              <div className="grid xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {topArtists
                  ? topArtists.slice(0, 5).map((artist: any) => (
                      <div key={artist.id}>
                        <ArtistCard artist={artist} />
                      </div>
                    ))
                  : null}
              </div>
            ) : (
              <div>Artists Still Loading ...</div>
            )}
          </div>
          {topSongs && topSongs?.length > 0 ? (
            <div className="text-2xl text-white my-6">Top Songs Today</div>
          ) : (
            <div></div>
          )}
          <div
            className={`grid items-center grid-cols-3 cursor-pointer gap-4 p-4 rounded-lg text-white`}
          >
            <div className="flex flex-row gap-4 text-white">
              <div>#</div>
              <div>Title</div>
            </div>
            <div>Album</div>
            <div>
              <img
                src="images/clock.svg"
                alt=""
                className="w-[24px] h-[24px] "
              />
            </div>
          </div>
          {topSongs
            ? topSongs.splice(0, 5).map((track: any, index: any) => (
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
      ) : (
        <div>Still Loading ...</div>
      )}
    </div>
  );
};

export default HomePage;
