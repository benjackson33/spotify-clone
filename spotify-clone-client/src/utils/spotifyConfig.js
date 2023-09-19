import axios from "axios"

const url = new URL(window.location).searchParams;
const accessToken = url.get("access_token");
const refreshToken = url.get("refresh_token");

export const spotifySearchConfig = {
    profile: "me",
    category: "browse/categories",
    album: "albums",
};

axios.defaults.baseURL = "https://api.spotify.com/v1"
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

localStorage.setItem("access_token", accessToken);
localStorage.setItem("refresh_token", refreshToken);

export const getTopTracks = (timeRange) => {
    return axios.get(
        `/me/top/tracks?time_range=${timeRange}`
    );
};

