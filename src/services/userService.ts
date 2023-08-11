export const getUserProfile = async (token: any) => {
  var result: any[] = [];

  if (token) {
    await fetch("https://api.spotify.com/v1/me", {
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
export const getUserTopArtists = async (token: any) => {
  var result: any[] = [];

  if (token) {
    // This is working but Spotify API doesnt give results

    // await fetch("https://api.spotify.com/v1/me/top/tracks", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data) {
    //       result = data;
    //     }
    //   });

    // this url is a placeholder
    await fetch(
      "https://api.spotify.com/v1/search?q=tunisian rap&type=artist",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.artists.items);
        if (data && data.artists) {
          result = data.artists.items;
        }
      });
  }

  // console.log(result);
  return result;
};
export const getUserTopTracks = async (token: any) => {
  var result: any[] = [];

  if (token) {
    // await fetch("https://api.spotify.com/v1/me/top/tracks", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data) {
    //       result = data;
    //     }
    //   });
    await fetch("https://api.spotify.com/v1/search?q=pop&type=track", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.tracks) {
          result = data.tracks.items;
        } else result = [];
      });
  }

  // console.log(result);
  return result;
};

export const getUserFollowedArtists = async (token: any) => {
  var result: any[] = [];

  if (token) {
    await fetch("https://api.spotify.com/v1/me/following?type=artist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          result = data;
        }
      });
  }

  // console.log(result);
  return result;
};
