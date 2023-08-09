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

  console.log(result);
  return result;
};
