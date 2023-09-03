import { useEffect, useState } from "react";
import {
  generateRandomString,
  generateCodeChallenge,
  generateURL,
  requestAccessToken,
} from "../utils/spotify-auth-code";

const Login = () => {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState();

  const handleLogin = async () => {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    await generateURL(CLIENT_ID, REDIRECT_URI);

    // https://accounts.spotify.com/en/authorize?response_type=code&client_id=9497ebf15edb4cfeb57b498ca843655f&scope=user-read-private+user-read-email+user-read-currently-playing+user-read-recently-played&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fcallback&state=EHZBcwkuguz7IKiP&code_challenge_method=S256&code_challenge=-qym-He_4B79Q1sxYi3TeWnSPDZI-pcBxo9riyc6NPs

    // http://localhost:5173/callback?code=AQBKM2T8WabI-u36aWzoyWextkvlMkEvfghJYAm-njkvBsn6KaKK6U42lsbtnV1D4RKVGhgc5RMFWT11v07Tc12E8p2UHk_pp66JQ26p0OmRMVz5V1wq4Hy8C3OAfObf5aGaLTSkE4Cp6hDMw_EvrtE6YhZzmF7g2Iz8WHhpI3crF_10nwAai30VPLDnQIUR1vf3G11MOlVCAKjxnaI7EbHf0DEXohYDLiXyRIvpX64_Ky7m90TjP-Hl8YrmxQP76BeltK7rJdeEbs2RSI1Eh0GtdImcUf_po3dzgaOyuMe6XwImd4N9On5tiCwtKgX93ZsP80xYBi8s5uDiWg-8pIWi4UzDjv7DOQsA-R_eBnkI&state=EHZBcwkuguz7IKiP
  };

  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const handleProfile = async () => {
    console.log(token);
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const profileData = await response.json();
      console.log(profileData);
      setProfile(profileData);
    } else {
      console.log("Error getting profile.");
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

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
    console.log(token);
  });

  return (
    <>
      <h1>Test Login</h1>
      {token ? (
        <div>
          <button onClick={handleProfile}>Profile</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </>
  );
};

export default Login;
