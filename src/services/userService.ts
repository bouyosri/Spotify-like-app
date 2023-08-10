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
        console.log(data);
        if (data) {
          result = data;
        }
      });
  }

  console.log(result);
  return result;
};
