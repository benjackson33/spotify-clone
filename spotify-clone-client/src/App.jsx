import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"
import "./App.css";

import Category from "./components/Category";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import TopTracks from "./components/TopTracks";
import Search from "./components/Search";
import ArtistSearch from "./components/ArtistSearch";



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
  

  return (
    <>
    <div className="search-bar">
      <Search token={token}/>
    </div>
    
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
