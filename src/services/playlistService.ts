export const getUserPlaylists = async (token: any, userId: string) => {
  var result: any[] = [];

  if (token) {
    try {
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
          if (data.items) {
            result = data.items;
          } else result = [];
        });
    } catch (error) {
      // Handle error here
    }
  }
  return result;
};
export const getPlaylistById = async (token: any, playlistId: string) => {
  var result: any[] = [];

  if (token) {
    await fetch("https://api.spotify.com/v1/playlists/" + playlistId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data) {
          result = data;
        }
      });
  }

  return result;
};
