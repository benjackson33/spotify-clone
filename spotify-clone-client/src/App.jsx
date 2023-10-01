import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Category from "./components/Category";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./pages/Profile";
import Search from "./components/Search";
import ArtistSearch from "./components/ArtistSearch";
import TopTracks from "./pages/TopTracks";
import TopArtists from "./pages/TopArtists";
import NavBar from "./components/NavBar";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // TODO: (GARETH) Refactor the Spotify Token. Maybe put into a separate function?
    const url = new URL(window.location).searchParams;
    const accessToken = url.get("access_token");
    const refreshToken = url.get("refresh_token");

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    setToken(accessToken);
  }, []);

  useEffect(() => {
    console.log(token);
  });

  return (
    <>
      <NavBar />
      <div className="search-bar">
        <Search token={token} />
      </div>

      {/* For experimentation. Main routing in the DIV below.  */}
      {/* <Routes>
                <Route path="/" element={<Profile token={token} />} />
                <Route
                    path="/top-tracks"
                    element={<TopTracks token={token} />}
                />
                <Route path="/top-artists" element={<TopArtists />} />
            </Routes> */}

      {/* This is the main section. Experiment with the above Routes. */}
      <div>
        {token ? (
          <>
            <Logout />
            <Routes>
              <Route path="/" element={<Profile token={token} />} />
              <Route path="/top-tracks" element={<TopTracks token={token} />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
