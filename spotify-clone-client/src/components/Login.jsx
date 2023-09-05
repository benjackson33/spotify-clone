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

    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

    const handleLogin = async () => {
        generateURL(CLIENT_ID, REDIRECT_URI);
    };

    const getProfile = async () => {
        await requestAccessToken(CLIENT_ID, REDIRECT_URI);
        let accessToken = localStorage.getItem("access_token");
        console.log(accessToken);
        setToken(accessToken);

        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        });

        const data = await response.json();
        setProfile(data);
    };

    const handleLogout = () => {
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
