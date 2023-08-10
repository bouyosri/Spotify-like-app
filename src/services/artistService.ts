export const searchArtists = async (searchKey: string, token: any) => {
  var result: any[] = [];
  var parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  if (searchKey.length > 0) {
    await fetch(
      "https://api.spotify.com/v1/search?q=" + searchKey + "&type=artist",
      parameters
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.artists && data.artists.items) {
          result = data.artists.items;
        }
      });
  }

  // console.log(result);
  return result;
};
export const getArtistRelated = async (artistId: string, token: any) => {
  var result: any[] = [];
  var parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  if (artistId.length > 0) {
    await fetch(
      "https://api.spotify.com/v1/artists/" + artistId + "/related-artists",
      parameters
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.artists) {
          result = data.artists;
        }
      });
  }

  // console.log(result);
  return result;
};
export const getArtistById = async (artistId: string, token: any) => {
  var result: any[] = [];
  var parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  if (artistId.length > 0) {
    await fetch("https://api.spotify.com/v1/artists/" + artistId, parameters)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.name);
        if (data) {
          result = data;
        }
      });
  }
  return result;
};
export const getArtistTopTracks = async (artistId: string, token: any) => {
  var result: any[] = [];
  var parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  if (artistId.length > 0) {
    await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistId +
        "/top-tracks?market=es",
      parameters
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data) {
          result = data.tracks;
        }
      });

    // console.log(result);
    return result;
  }
};
