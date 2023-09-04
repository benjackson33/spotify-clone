import { useEffect, useState } from "react";
import axios from "axios";
import CurrentlyPlaying from "./CurrentlyPlaying";

const Gareth = () => {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const SCOPE =
        "user-read-private user-read-email user-read-currently-playing user-read-recently-played";
    const RESPONSE_TYPE = "token";

    const [token, setToken] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [profile, setProfile] = useState();
    const [currentlyPlaying, setCurrentlyPlaying] = useState();
    const [artists, setArtists] = useState([]);

    // const getToken = () => {
    //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    //     let token = urlParams.get('access_token');
    // }

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");
        console.log(hash);
        console.log(token);

        // getToken()

        if (!token && hash) {
            token = hash
                .substring(1)
                .split("&")
                .find((elem) => elem.startsWith("access_token"))
                .split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }

        setToken(token);
    }, []);

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    };

    const getProfile = async () => {
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const profileData = await response.json();
            setProfile(profileData);
            getCurrentlyPlaying();
        } else {
            console.log("Error getting profile.");
        }
    };

    const getCurrentlyPlaying = async () => {
        const response = await fetch(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            setCurrentlyPlaying(data);
        } else {
            console.log("Error getting current song.");
        }
    };

    const Profile = ({ profile }) => {
        return (
            <>
                <h1>Display your Spotify profile data</h1>
                <section id="profile">
                    <h2>
                        Logged in as <span id="displayName"></span>
                    </h2>
                    <img src={profile.images[1].url}></img>
                    <span id="avatar"></span>
                    <ul>
                        <li>
                            User ID: <span id="id">{profile.display_name}</span>
                        </li>
                        <li>
                            Email: <span id="email">{profile.email}</span>
                        </li>
                        <li>
                            Spotify URI:{" "}
                            <a id="uri" href={profile.uri}>
                                {profile.uri}
                            </a>
                        </li>
                        <li>
                            Link: <a id="url" href="#"></a>
                        </li>
                        <li>
                            Profile Image:{" "}
                            <span id="imgUrl">
                                {profile.images.length === 0
                                    ? "No profile image"
                                    : profile.images.map((image) => {
                                          <img src=""></img>;
                                      })}
                            </span>
                        </li>
                    </ul>
                </section>
            </>
        );
    };

    const searchArtists = async (e) => {
        e.preventDefault();

        const { data } = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: searchKey,
                type: "artist",
            },
        });

        setArtists(data.artists.items);
    };

    const renderArtists = () => {
        return artists.map((artist) => (
            <div key={artist.id}>
                {artist.images.length ? (
                    <img width={"100%"} src={artist.images[0].url} alt="" />
                ) : (
                    <div>No Image</div>
                )}
                {artist.name}
            </div>
        ));
    };

    useEffect(() => {
        console.log(currentlyPlaying);
    }, [currentlyPlaying]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify React</h1>
                {!token ? (
                    <a
                        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
                    >
                        Login to Spotify
                    </a>
                ) : (
                    <button onClick={logout}>Logout</button>
                )}

                {token ? (
                    <>
                        <form onSubmit={searchArtists}>
                            <input
                                type="text"
                                onChange={(e) => setSearchKey(e.target.value)}
                            />
                            <button type={"submit"}>Search</button>
                        </form>

                        {profile ? (
                            <Profile profile={profile} />
                        ) : (
                            <button onClick={getProfile}>Profile</button>
                        )}
                        <button onClick={getCurrentlyPlaying}>
                            Currently Playing
                        </button>
                        {currentlyPlaying && (
                            <CurrentlyPlaying
                                currentlyPlaying={currentlyPlaying}
                            />
                        )}
                    </>
                ) : (
                    <h2>Please login</h2>
                )}

                {renderArtists()}
            </header>
        </div>
    );
};

export default Gareth;
