import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"
import "./App.css";

import spotifySearchConfig from "./utils/spotifySearchConfig";
import Category from "./components/Category";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import TopTracks from "./components/TopTracks";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // TODO: Refactor the Spotify Token. Maybe put into a separate function?
    const url = new URL(window.location).searchParams;
    const accessToken = url.get("access_token");
    const refreshToken = url.get("refresh_token");

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    setToken(accessToken);
  }, []);

  return (
    <>
      <div>
        <h1>Hello</h1>
        {token ? (
          <>
            <Profile token={token} />
            {/* <Category token={token} /> */}
            <TopTracks token={token} />
            <Logout />
          </>
        ) : (
          <>
            <Login />
          </>
        )}
      </div>
    </>
  );
}

export default App;
