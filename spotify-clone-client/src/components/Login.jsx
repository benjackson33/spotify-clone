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
        await generateURL(CLIENT_ID, REDIRECT_URI)
        await requestAccessToken(CLIENT_ID, REDIRECT_URI)
    };

    const getProfile = async () => {
        // let accessToken = localStorage.getItem("token");
        // console.log(accessToken);
        // setToken(accessToken);

        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: "Bearer " + token,
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
        requestAccessToken(CLIENT_ID, REDIRECT_URI)
        setToken(window.localStorage.access_token)
        console.log(window.localStorage);
    });

    // useEffect(() => {
    //     const hash = window.location.hash;
    //     let token = window.localStorage.getItem("token");

    //     // getToken()

    //     if (!token && hash) {
    //         token = hash
    //             .substring(1)
    //             .split("&")
    //             .find((elem) => elem.startsWith("access_token"))
    //             .split("=")[1];

    //         window.location.hash = "";
    //         window.localStorage.setItem("token", token);
    //     }

    //     setToken(token);
    // }, []);

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
