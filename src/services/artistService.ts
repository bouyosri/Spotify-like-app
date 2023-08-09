export const searchArtists = async (searchKey: string, token: any) => {
  var result;
  var parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  console.log(searchKey);
  if (searchKey.length > 0) {
    const data = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchKey + "&type=artist",
      parameters
    )
      .then((response) => response.json())
      .then((data) => (result = data.artists.items));
  }

  console.log(result);
  return result;
  // setArtists(data.artists.items);
};
