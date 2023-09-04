import { useEffect, useState } from "react";
import {
  generateRandomString,
  generateCodeChallenge,
  generateURL,
  requestAccessToken,
} from "../utils/spotify-auth-code";
import Profile from "./Profile";

const Login = () => {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState();

  const handleLogin = async () => {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    await generateURL(CLIENT_ID, REDIRECT_URI);
    await requestAccessToken(CLIENT_ID, REDIRECT_URI);
  };

  const getProfile = async () => {
    let accessToken = localStorage.getItem("access_token");
    console.log(accessToken);
    setToken(accessToken);

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await response.json();
    console.log(data);
    setProfile(data);
  };

  const handleLogout = () => {
    console.log(token);
    setToken("");
    window.localStorage.removeItem("token");
  };

  useEffect(() => {
    console.log(window.localStorage);
  });

  return (
    <>
      <h1>Test Login</h1>
      <button onClick={getProfile}>Get Profile</button>
      <button onClick={handleLogout}>Log out</button>
      <button onClick={handleLogin}>Login</button>
      {/* {profile && <Profile profile={profile} /> } */}
    </>
  );
};

export default Login;

// BQBW8qGWQ4hcCMYM7sMh0Y0TMUQOu_n6ldc7M1WnU7ncVmQAdJsJf141l7kdfbF89mkkAWh45uxZpWhNoDdQu1LiyAUn4nwKqJ5DPIe7jlhyLThJLYi8wlieVJGWwCGpEKWUHHfWH-oZnCFi6rArReBV08mSdjjMrF9EjqnJ2qso64UkKo0rhmR9mQ1UoOTyXUDi