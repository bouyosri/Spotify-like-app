const CLIENT_ID = "8684bba9520740fabffe4cce9c33985a";
const CLIENT_SECRET = "3b85003b1f414acb9b2c95fe14e43b67";
const REDIRECT_URI = "http://localhost:3000/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

export const getTokenFromHash = (): string | null => {
  const hash = window.location.hash;
  const tokenElement = hash
    .substring(1)
    .split("&")
    .find((elem) => elem.startsWith("access_token"));

  if (tokenElement) {
    const token = tokenElement.split("=")[1];
    window.localStorage.setItem("token", token);
    window.location.hash = "";
    return token;
  } else {
    return window.localStorage.getItem("token");
  }
};

export const logout = (): void => {
  window.localStorage.removeItem("token");
};

export const getAuthorizationUrl = (): string => {
  return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
};

export const getAuthorizationUrlToGetCurrentTrack = () => {
  const CLIENT_ID = "8684bba9520740fabffe4cce9c33985a";
  const REDIRECT_URI = "http://localhost:3000/";
  const RESPONSE_TYPE = "token";
  const SCOPES = "user-read-playback-state";

  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
};
export const getAuthorization = async () => {
  var authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      CLIENT_ID +
      "&client_secret=" +
      CLIENT_SECRET,
  };
  const data = await fetch(
    "https://accounts.spotify.com/api/token",
    authParameters
  ).then((response) => response.json());
};
