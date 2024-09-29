import express from "express";
import kamran from "../../functions/main.js";
const router = express.Router();

router.post("/", async (request, res) => {
  const { action, accessToken } = request.body;

  try {

    const url = `https://api.spotify.com/v1/me/player/${action}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    // Check if response status is 201
    if (response.status === 204) {
        const data = await response.json();
        res.json({status: true, data: data});
    } else {
        res.status(response.status).json({
            status: false,
            message: `Failed with status code: ${response.status}`
        });
    }
  } catch (error) {
    console.error("Error during token exchange:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
