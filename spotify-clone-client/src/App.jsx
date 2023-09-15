import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Profile from "./components/Profile";

import spotifySearchConfig from "./utils/spotifySearchConfig";
import Category from "./components/Category";

function App() {
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);

    const getProfile = () => {
        return axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };
    const getCategories = () => {
        const res = axios.get(`https://api.spotify.com/v1/browse/categories`, {
            header: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);
        return res;
    };

    useEffect(() => {
        // TODO: Refactor the Spotify Token. Maybe put into a separate function?
        const url = new URL(window.location).searchParams;
        const accessToken = url.get("access_token");
        const refreshToken = url.get("refresh_token");

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        setToken(accessToken);

        const setProfileData = async () => {
            try {
                const { data } = await getProfile();
                setProfile(data);
            } catch (err) {
                console.log(err);
            }
        };

        // ! If you have issues with the Axios calls, for now:
        // ! Comment setProfileData() > Save > Uncomment setProfileData() > Save
        setProfileData();

        
    }, []);

    useEffect(() => {
        console.log(profile);
    }, [profile]);

    return (
        <>
            <div>
                <h1>Hello</h1>
                <Login />
                {profile && <Profile profile={profile} />}
                <Category token={token} />
            </div>
        </>
    );
}

export default App;
