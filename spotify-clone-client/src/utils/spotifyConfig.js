import axios from "axios"

const url = new URL(window.location).searchParams;
const accessToken = url.get("access_token");
const refreshToken = url.get("refresh_token");

export const spotifyLogo = "https://cdn.svgporn.com/logos/spotify-icon.svg"


export const spotifySearchConfig = {
    profile: "me",
    category: "browse/categories",
    album: "albums",
};

axios.defaults.baseURL = "https://api.spotify.com/v1"
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

localStorage.setItem("access_token", accessToken);
localStorage.setItem("refresh_token", refreshToken);

// Top Items: 
// STRING - "artists"/"tracks", 
// STRING - "short_term", "medium_term", "long_term"
export const getUsersTopItems = (item, timeRange) => {
    return axios.get(
        `/me/top/${item}?time_range=${timeRange}`
    );
};

export const getTracks = (id) => {
    return axios.get(
        `/me/top/tracks?time_range=${id}`
    );
};


export const getPlaylists = () => {
    return axios.get(
        `/me/playlists`
        )
}

