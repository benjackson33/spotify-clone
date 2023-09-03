import { useEffect, useState } from "react";
import {
  generateRandomString,
  generateCodeChallenge,
  generateURL,
  requestAccessToken,
} from "../utils/spotify-auth-code";

const Login = () => {
  const [code, setCode] = useState();
  const [token, setToken] = useState("");

  const handleLogin = async () => {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    await generateURL(CLIENT_ID, REDIRECT_URI);
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    
    // if (!token && hash) {
    //   token = hash
    //     .substring(1)
    //     .split("&")
    //     .find((elem) => elem.startsWith("access_token"))
    //     .split("=")[1];

    //   window.location.hash = "";
    //   window.localStorage.setItem("token", token);
    // }

    // setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <>
      <h1>Test Login</h1>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Login;
