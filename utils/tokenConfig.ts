// MODULE USED FOR CONFIGURING A TOKEN TO SEND IN REQUEST

// Setup config/headers and token
export const tokenConfig = (token) => {
  // Get token from localstorage
  // const token = state.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  // If token, add to headers
  if (token) {
    config.headers.authorization = token;
  }
  return config;
};
