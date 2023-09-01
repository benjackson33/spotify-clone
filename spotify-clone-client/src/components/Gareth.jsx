import { useEffect, useState } from "react";
import {
  redirectToAuthCodeFlow,
  getAccessToken,
} from "../utils/spotify-auth-code";
import axios from "axios";

// const Gareth = () => {
//   const spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
//   const spotifyRedirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
//   const spotifyAuthEndpoint = "https://accounts.spotify.com/authorise";

//   const [profile, setProfile] = useState(null);

//   const onLogin = () => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");

//     const getProfile = async () => {
//       const accessToken = await getAccessToken(spotifyClientId, code);
//       const profile = await fetchProfile(accessToken);
//       setProfile(profile);
//     };

//     if (!code) {
//       redirectToAuthCodeFlow(
//         spotifyClientId,
//         spotifyAuthEndpoint,
//         spotifyRedirectUri
//       );
//     } else {
//       getProfile();
//     }
//   };

//   return (
//     <>
//       <h1>Display your Spotify profile data</h1>

//       <section id="profile">
//         <h2>
//           Logged in as <span id="displayName"></span>
//         </h2>
//         <span id="avatar"></span>
//         <ul>
//           <li>
//             User ID: <span id="id"></span>
//           </li>
//           <li>
//             Email: <span id="email"></span>
//           </li>
//           <li>
//             Spotify URI: <a id="uri" href="#"></a>
//           </li>
//           <li>
//             Link: <a id="url" href="#"></a>
//           </li>
//           <li>
//             Profile Image: <span id="imgUrl"></span>
//           </li>
//         </ul>
//       </section>
//     </>
//   );
// };

const Gareth = () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [profile, setProfile] = useState();
  const [artists, setArtists] = useState([]);

  // const getToken = () => {
  //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
  //     let token = urlParams.get('access_token');
  // }

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

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

  const searchArtists = async (e) => {
    e.preventDefault();

    getProfile()

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

  const getProfile = async () => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const profileData = await response.json();
      console.log(profileData);
      setProfile(profileData)
    } else {
      console.log("Error getting profile.");
    }
  }

  const Profile = (props) => {
    return (
      <>
        <h1>Display your Spotify profile data</h1>
        <section id="profile">
          <h2>
            Logged in as <span id="displayName"></span>
          </h2>
          <span id="avatar"></span>
          <ul>
            <li>
              User ID: <span id="id"></span>
            </li>
            <li>
              Email: <span id="email"></span>
            </li>
            <li>
              Spotify URI: <a id="uri" href="#"></a>
            </li>
            <li>
              Link: <a id="url" href="#"></a>
            </li>
            <li>
              Profile Image: <span id="imgUrl"></span>
            </li>
          </ul>
        </section>
      </>
    );
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
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
            <Profile profile={profile} />
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
