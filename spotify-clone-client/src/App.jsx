import { useEffect, useState } from "react";
import { Routes, Route, Router } from "react-router-dom";
import "./App.css";

import Category from "./components/Category";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./pages/Profile";
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
        <Search />
      </div>

      <div>
        {token ? (
          <Router>
            <Route
              path="/profile"
              element={token && <Profile token={token} />}
            />
            {/* <Category token={token} /> */}
            <Logout />
          </Router>
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
