// ArtistCard.tsx

import React from "react";

interface ArtistCardProps {
  artist: any;
}
const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <a href={"artist?id=" + artist.id}>
      <div className="artist-card  bg-[#181818] hover:bg-[#202020] cursor-pointer p-4 shadow-md rounded-md">
        <img
          src={
            artist.images.length > 0
              ? artist.images[0]?.url
              : "images/artist.png"
          } // Replace with your default image URL
          alt={artist.name}
          className="w-40 h-40 rounded-full mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold truncate max-w-[250px]">
          {artist.name}
        </h3>
        <p className="text-gray-300 mt-1 truncate max-w-[250px]">
          {capitalizeFirstLetter(artist.type)}
        </p>
        <p className="text-gray-500 mt-2 truncate max-w-[250px]">
          Genres: {artist.genres.slice(0, 3).join(", ")}
        </p>
      </div>
    </a>
  );
};

export default ArtistCard;
