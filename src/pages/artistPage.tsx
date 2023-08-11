import React from "react";
import { useLocation } from "react-router-dom";
import {
  getArtistById,
  getArtistRelated,
  getArtistTopTracks,
} from "../services/artistService";
import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";

const ArtistPage: React.FC<any> = ({ token, onSelectTrack }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const artistId = new URLSearchParams(location.search).get("id") || "";
  const [artist, setArtist] = useState<any | null>(null);
  const [topSongs, setTopSongs] = useState<any | null>(null);
  const [similarArtists, setSimilarArtists] = useState<any | null>(null);
  const [playingTrack, setPlayingTrack] = useState<any | null>(null);

  useEffect(() => {
    if (artistId) {
      getArtist();
      getArtistTopSongs();
      getRelatedArtists();
    }
  }, [token]);

  const getArtist = async () => {
    try {
      // console.log(token);
      const resultArtist = await getArtistById(artistId, token);
      if (resultArtist) setArtist(resultArtist);
      // console.log("artist", artist);

      if (token) await getArtistTopTracks(artistId, token);
    } catch (error) {
      console.error("Error searching artists:", error);
    }
  };
  const getArtistTopSongs = async () => {
    try {
      // console.log(token);
      const resultSongs = await getArtistTopTracks(artistId, token);
      const resultSossngs = await getArtistRelated(artistId, token);
      if (resultSongs) setTopSongs(resultSongs);
      // console.log("topSongs", topSongs);
      // console.log("artits alike", resultSossngs);
    } catch (error) {
      console.error("Error searching tracks:", error);
    }
  };
  const getRelatedArtists = async () => {
    try {
      // console.log(token);
      const result = await getArtistRelated(artistId, token);
      if (result) setSimilarArtists(result);
      // console.log("similar", result);
    } catch (error) {
      console.error("Error searching artists:", error);
    }
  };

  const setTrack = (track: any) => {
    // console.log(track);
    onSelectTrack(track);
  };

  return (
    <div className="w-[98%] h-[90%] bg-[#181818] text-white m-4 rounded-xl overflow-y-scroll max-h-[98%]">
      {artist && (
        <div className="bg-[#202020]  p-4 shadow-md ">
          <div className="flex flex-row">
            <div className="align-middle self-center">
              <div className="mx-4 ">
                <h3 className="lg:text-6xl text-4xl text-white font-semibold truncate max-w-[450px] lg:max-w-[650px]">
                  {artist.name}
                </h3>
              </div>
              <div className="mx-4">
                <p className="text-gray-300 mt-1 truncate max-w-[250px]">
                  {/* {capitalizeFirstLetter(artist.type)} */}
                </p>
              </div>
              <div className="mx-4">
                <p className="text-gray-500 mt-2 truncate max-w-[250px]">
                  Genres: {artist.genres.slice(0, 3).join(", ")}
                </p>
              </div>{" "}
              <div className="mx-4 mt-20">
                <p className="text-white mt-2 truncate max-w-[250px]">
                  {artist.followers.total} followers
                </p>
              </div>
            </div>
            <div className="mx-4">
              <img
                src={
                  artist.images.length > 0
                    ? artist.images[0]?.url
                    : "images/artist.png"
                }
                alt={artist.name}
                className="h-40 lg:h-96 w-40 lg:w-96 rounded-xl mx-auto mb-4"
              />
            </div>
          </div>
          {similarArtists && similarArtists?.length > 0 ? (
            <div className="text-2xl text-white my-6">Similar Artists</div>
          ) : null}
          <div className="grid xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {similarArtists
              ? similarArtists.splice(0, 5).map((artist: any) => (
                  <div>
                    <ArtistCard artist={artist} />
                  </div>
                ))
              : null}
          </div>
          {topSongs && topSongs?.length > 0 ? (
            <div className="text-2xl text-white my-6">Top Songs</div>
          ) : null}

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
            <div></div>
          </div>
          <div className="overflow-y-scroll max-h-[800px]">
            {topSongs && topSongs?.length > 0
              ? topSongs.splice(0, 5).map((track: any, index: any) => (
                  <div>
                    <div
                      className={`grid items-center grid-cols-3 cursor-pointer gap-4 p-4 rounded-lg ${
                        playingTrack?.id === track?.id
                          ? "bg-zinc-900"
                          : "hover:bg-zinc-800"
                      }`}
                      onDoubleClick={() => setTrack(track)}
                    >
                      <div className="flex flex-row text-white items-center gap-4">
                        {index + 1}
                        <div className="rounded-full">
                          <img
                            src={track.album.images[0].url}
                            alt=""
                            className="w-[50px] rounded-lg h-[50px] min-w-[50px] min-h-[50px] "
                          />
                        </div>
                        <div className="truncate max-w-[350px] text-white">
                          {track.name}
                        </div>
                      </div>
                      <div className="truncate max-w-[250px] text-white">
                        {track.album.name}
                      </div>
                      <div className="text-white">
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
        </div>
      )}
    </div>
  );
};

export default ArtistPage;
