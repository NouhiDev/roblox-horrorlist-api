const noblox = require("noblox.js")

// Express Server Setup
const express = require('express')
const app = express()
const port = 8080

app.get('/game-info/:id', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "nouhi.dev");
    const game_info = await noblox.getUniverseInfo([ req.params['id'] ]);
    res.send(game_info);
})

app.listen(port, () => {
    console.log(`Roblox Horrorlist API Server listening on port ${port}`)
});