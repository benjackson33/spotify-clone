import { useEffect, useState } from "react";
import {
  generateRandomString,
  generateCodeChallenge,
  generateURL,
  requestAccessToken,
} from "../utils/spotify-auth-code";

const Login = () => {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState();

  const handleLogin = async () => {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    await generateURL(CLIENT_ID, REDIRECT_URI);
  };

  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const handleProfile = async () => {
    console.log(token);
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const profileData = await response.json();
      console.log(profileData);
      setProfile(profileData);
    } else {
      console.log("Error getting profile.");
    }
  };

  return (
    <>
      <h1>Test Login</h1>
      {token ? (
        <div>
          <button onClick={handleProfile}>Profile</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </>
  );
};

export default Login;
