export const getUserPlaylists = async (token: any, userId: string) => {
  var result: any[] = [];

  if (token) {
    await fetch(
      "https://api.spotify.com/v1/users/" + userId + "/playlists?limit=20",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          result = data.items;
        }
      });
  }

  return result;
};
