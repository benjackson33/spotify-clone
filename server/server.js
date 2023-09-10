require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const port = 3001;
const app = express();

app.use(cors());

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = "http://localhost:3001/callback";

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

  res.redirect("https://accounts.spotify.com/authorize?" + args);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect("/#" + args);
  } else {
    let args = new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        data: args,
        headers: {
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      if (response.status === 200) {
        const { data } = response

        try {
          const profileResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${data.access_token}`
            }   
          })
          res.send(profileResponse.data)
        } catch (err) {
          res.send(err)
        }

      } else {
        res.send(response);
      }

    } catch (err) {
      res.send(err)
    }
  }
});

app.get("/refresh_token", async (req, res) => {
  const { refresh_token } = req.query

  let data = {
    grant_type: "refresh_token",
    refresh_token: refresh_token
  }

  try {
    const response = await axios({
      method: "POST",
      url: 'https://accounts.spotify.com/api/token',
      data: data,
      headers: {
        'Authorization': `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })

    if (response.status === 200) {
      const { access_token } = req.query.data
      // const refresh_response = await axios.get(`http://localhost:3001/refresh_token?refresh_token=${refresh_token}`)
      res.send({
        'access_token': access_token
      })
    } else {
      res.send(response)
    }
  } catch (err) {
    res.send(err)
  }
})

app.listen(port, () => console.log(`Listening on port ${port}!`));
