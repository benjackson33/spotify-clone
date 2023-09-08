// Generate a cryptographic random string between 43 & 128 characters according to the PKCE standard.
export function generateRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Generate a code challenge that hashes the code verifier using the SHA 256 algorithm.
export async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

// Generate a random string of 128 characters
// Generate a hashed code from the string
// Return the login page with the code. Provide Spotify's ClientID and RedirectUri
export async function generateURL(clientId, redirectUri) {
  let codeVerifier = generateRandomString(128);
  let codeChallenge = await generateCodeChallenge(codeVerifier);

  let state = generateRandomString(16);
  let scope =
    "user-read-private user-read-email user-read-currently-playing user-read-recently-played";

  localStorage.setItem("code_verifier", codeVerifier);

  let args = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  window.location = "https://accounts.spotify.com/authorize?" + args;
}

export async function requestAccessToken(clientId, redirectUri) {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");

  let codeVerifier = localStorage.getItem("code_verifier");

  let body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });

  console.log(response);

  if (response.status === 200) {
    let data = await response.json();
    console.log(data);
    localStorage.setItem("access_token", data.access_token);
    return data
  } else {
    throw new Error("HTTP status " + response.status);
  }
}

// const response = fetch("https://accounts.spotify.com/api/token", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   body: body,
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("HTTP status " + response.status);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     localStorage.setItem("access_token", data.access_token);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });


// URLSearchParams(5) { grant_type → "authorization_code", code → "AQA-g9n6N-EhQ4zjkt4NV2tDBDJjr3jBLnghQkrGByWszLki76Qersmua0SLhAm4TRMUvOVp6TAHbDQIGYKUXiRPXZZCaGOak1neQoBP5KQiAmImAFXmWVuIsiyRMcX8nPXnZWirrD8i1IQuJRp8WCPKczeWRevn1ScwT4rk4kM9IJv8yYaL2_I8SWmaIsEnkGofpL5gd4lSkAnN5zrSoANdUJPYqaMpG336ejp1kGqVdIsKAn7Esk2yYkmr_skj9gREpxkp-6fy0Ubx-NkFCx-aCldBI005xWTuphOrb2Hu0-1CnYi1MItLiJOUkUwS6Eiv93wb6b9c8lj6uNNqvOMm-93TZuINdN-NCa8ySwF3", redirect_uri → "http://localhost:5173/callback", client_id → "9497ebf15edb4cfeb57b498ca843655f", code_verifier → "GpAqgXn9cQmcw4fEqw0YSzUVBWPNiuQFMYMHOfopVYq355V1D23BHBP6VHijBKUaEeUY6F1SXZMN3rQL5IUaJKMmTYqkWM8Z4UP0RDjyS5l39yIdxy0R6xgJVte0NqaA" }
// spotify-auth-code.jsx:46:11
