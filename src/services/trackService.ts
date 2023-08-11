const getAuthorizationUrl = () => {
  const CLIENT_ID = "your-client-id";
  const REDIRECT_URI = "http://localhost:3000/";
  const RESPONSE_TYPE = "token";
  const SCOPES = "user-read-playback-state"; // Add the required scope(s) here

  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
};
export const getCurrentTrack = async (token: any) => {
  var result: any;
  // console.log(token);
  var parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    parameters
  );

  if (!response.ok) {
    throw new Error("Error fetching currently playing track");
  }

  const data = await response.json();
  return data;
};

export const getTrack = async (id: any, token: any) => {
  var result: any;
  // console.log(token);
  var parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  await fetch("https://api.spotify.com/v1/tracks/" + id, parameters)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // console.log(data);
        result = data;
      }
    });
};

export const pauseTrack = async (token: any) => {
  var result: any;
  // console.log(token);
  var parameters = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  await fetch("https://api.spotify.com/v1/me/player/pause", parameters)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // console.log(data);
        result = data;
      }
    });
};

export const playTrackById = async (token: any, trackId: string) => {
  const response = await fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: [`spotify:track:${trackId}`],
    }),
  });

  if (!response.ok) {
    throw new Error("Error playing track");
  }
};

export const searchTracks = async (searchKey: string, token: any) => {
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
      "https://api.spotify.com/v1/search?q=" + searchKey + "&type=track",
      parameters
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.tracks.items);
        if (data.tracks) {
          result = data.tracks.items;
        }
      });
  }

  // console.log(result);
  return result;
};
