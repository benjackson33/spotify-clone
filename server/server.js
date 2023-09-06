require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const port = 3001;
const app = express();

app.use(cors());

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = "http://localhost:3000/callback";

const generateRandomString = (length) => {
  let text = "";
  const possibleText =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possibleText.charAt(
      Math.floor(Math.random() * possibleText.length)
    );
  }
  return text;
};

app.get("/login", (req, res) => {
  let state = generateRandomString(16);
  let scope =
    "user-read-private user-read-email user-read-currently-playing user-read-recently-played";

  let args = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize?" + args
  );
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
