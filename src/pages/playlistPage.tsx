import React from "react";
import { useLocation } from "react-router-dom";
import {
  getArtistById,
  getArtistRelated,
  getArtistTopTracks,
} from "../services/artistService";
import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";
import { getPlaylistById } from "../services/playlistService";

const PlaylistPage: React.FC<any> = ({ token, onSelectTrack }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const playlistId = new URLSearchParams(location.search).get("id") || "";
  const [playlist, setPlaylist] = useState<any | null>(null);
  const [tracks, setTracks] = useState<any>([]);
  const [topSongs, setTopSongs] = useState<any | null>(null);
  const [similarArtists, setSimilarArtists] = useState<any | null>(null);
  const [playingTrack, setPlayingTrack] = useState<any | null>(null);

  useEffect(() => {
    getPlaylist();
  }, [playlist]);

  const getPlaylist = async () => {
    try {
      // console.log(token);
      const result = await getPlaylistById(token, playlistId);
      if (result) {
        setPlaylist(result);
        if (playlist.tracks) setTracks(playlist.tracks.items);
        // console.log("playlist", result);
        console.log("playlist", playlist);
        console.log("tracks", tracks);
      }
    } catch (error) {
      console.error("Error searching artists:", error);
    }
  };

  const setTrack = (track: any) => {
    // console.log(track);
    onSelectTrack(track);
  };

  return (
    <div className="w-[98%] h-[90%] bg-[#181818] m-4 rounded-xl overflow-y-scroll max-h-[98%] text-white">
      {playlist ? (
        <div className="bg-[#202020]  p-4 shadow-md ">
          <div className="flex flex-row">
            <div className="mx-4">
              <img
                src={
                  playlist.images && playlist.images.length > 0
                    ? playlist.images[0]?.url
                    : "images/artist.png"
                } // Replace with your default image UR
                alt={playlist.name}
                className="h-40 lg:h-96 w-40 lg:w-96 rounded-xl mx-auto mb-4"
              />
            </div>

            <div className="align-middle self-center">
              <div className="mx-4 ">
                <div className="lg:text-xl text-xs text-zinc-400 font-semibold truncate max-w-[450px] lg:max-w-[650px]">
                  Playlist
                </div>
              </div>
              <div className="mx-4 ">
                <h3 className="lg:text-8xl text-4xl text-white font-semibold truncate max-w-[450px] lg:max-w-[650px]">
                  {playlist.name}
                </h3>
              </div>
              <div className="">
                <p className="text-gray-300 mt-1 truncate max-w-[250px]">
                  {/* {capitalizeFirstLetter(artist.type)} */}
                </p>
              </div>
              <div>
                <p className="text-white mx-4 truncate max-w-[250px]">
                  By{" "}
                  {playlist.owner && playlist.owner.display_name
                    ? playlist.owner.display_name
                    : null}
                </p>
              </div>
            </div>
          </div>
          {playlist.tracks && tracks && tracks?.length > 0 ? (
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
          <div className="h-[90%] ">
            {tracks && tracks?.length > 0
              ? tracks.map((track: any, index: any) => (
                  <div>
                    <div
                      className={`grid items-center grid-cols-3 cursor-pointer gap-4 p-4 rounded-lg ${
                        playingTrack?.id === track?.track.id
                          ? "bg-zinc-900"
                          : "hover:bg-zinc-800"
                      }`}
                      onDoubleClick={() => setTrack(track.track)}
                    >
                      <div className="flex flex-row text-white items-center gap-4">
                        {index + 1}
                        <div className="rounded-full">
                          <img
                            src={track.track.album.images[0].url}
                            alt=""
                            className="w-[50px] rounded-lg h-[50px] min-w-[50px] min-h-[50px] "
                          />
                        </div>
                        <div className="truncate max-w-[350px] ">
                          {track.track.name}
                        </div>
                      </div>
                      <div className="truncate max-w-[250px] ">
                        {track.track.album && track.track.album.name
                          ? track.track.album.name
                          : null}
                      </div>
                      <div className="">
                        {Math.floor(track.track.duration_ms / 60000)
                          .toString()
                          .padStart(2, "0")}
                        :
                        {((track.track.duration_ms % 60000) / 1000)
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
      ) : null}
    </div>
  );
};

export default PlaylistPage;
