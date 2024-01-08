import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./pages/Profile";
import Search from "./components/Search";
import ArtistSearch from "./components/ArtistSearch";
import TopTracks from "./pages/TopTracks";
import TopArtists from "./pages/TopArtists";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import TopBar from "./components/TopBar";
import Playlists from "./pages/Playlists";
import Playlist from "./pages/Playlist";
import Player from "./components/Player";

function App() {
  const [token, setToken] = useState(null);

  // Obtain ACCESS_TOKEN & REFRESH_TOKEN from the URL and save it in localStorage for now.
  useEffect(() => {
    // TODO: (GARETH) Refactor the Spotify Token. Maybe put into a separate function?
    const url = new URL(window.location).searchParams;
    const accessToken = url.get("access_token");
    const refreshToken = url.get("refresh_token");

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    setToken(accessToken);
  }, []);

  // useEffect(() => {
  //   console.log(token);
  // });

  return (
    <div className="app-container">
      <NavBar />
      {/* Commented the Search temporarily */}
      {/* <div className="search-bar">
        <Search token={token} />
      </div> */}

      {/* This is the main section. Experiment with the above Routes. */}
      <div className="page-content">
        {token ? (
          <>
            <TopBar />
            <Logout />
            <Routes>
              <Route path="/" element={<Home token={token} />} />
              <Route path="/profile" element={<Profile token={token} />} />
              <Route path="/top-tracks" element={<TopTracks token={token} />} />
              <Route path="/playlists" element={<Playlists token={token} />} />
              <Route path="/playlist/:id" element={<Playlist />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </div>
      <Player token={token} />
    </div>
  );
}

export default App;
