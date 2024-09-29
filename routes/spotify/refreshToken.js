import express from "express";
import querystring from "querystring";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import kamran from "../../functions/main.js";
const router = express.Router();
import fetch from 'node-fetch';

const CLIENT_ID = "b75d3435992c4f9dbac38d59e2db62ef";
const CLIENT_SECRET = "6c61f99a801147d8bf6e88a52edf945e";
const REDIRECT_URI = "http://localhost:8080/callback/spotify"; // Must match Spotify dashboard

const AUTH_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

router.post("/", async (request, res) => {
  const { email, refreshToken } = request.body;

  try {
    const users = await kamran.database.getDatabase(
      "b59b7631-f435-4189-b2ab-0c26a27def85"
    );
    for (let user in users.data) {
      if (users.data[user].email == email) {
        const tokenResponse = await fetch(TOKEN_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: querystring.stringify({
            grant_type: "refresh_token",
            refresh_token:
              users.data[user].linkedAccounts[0].spotify.refreshToken,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          }),
        });

        const tokenData = await tokenResponse.json();

        users.data[user].linkedAccounts[0].spotify.accessToken = tokenData.access_token;
        users.data[user].linkedAccounts[0].spotify.accessTokenExpiration = Date.now() + (tokenData.expires_in * 1000);
        console.log("Refreshed Token")
        // Update the database entry
        const add = await kamran.database.editEntry(
          "b59b7631-f435-4189-b2ab-0c26a27def85",
          users.data[user].id,
          users.data[user]
        );

        if (add.status == true) {
          return res.json({ status: true, message: "Logged in successfully" });
        } else {
          return res.status(500).json({ error: "Failed to update user" });
        }
      }
    }
  } catch (error) {
    console.error("Error during token exchange:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
