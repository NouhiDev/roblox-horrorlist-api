// ██████╗░░█████╗░██████╗░██╗░░░░░░█████╗░██╗░░██╗
// ██╔══██╗██╔══██╗██╔══██╗██║░░░░░██╔══██╗╚██╗██╔╝
// ██████╔╝██║░░██║██████╦╝██║░░░░░██║░░██║░╚███╔╝░
// ██╔══██╗██║░░██║██╔══██╗██║░░░░░██║░░██║░██╔██╗░
// ██║░░██║╚█████╔╝██████╦╝███████╗╚█████╔╝██╔╝╚██╗
// ╚═╝░░╚═╝░╚════╝░╚═════╝░╚══════╝░╚════╝░╚═╝░░╚═╝

// ██╗░░██╗░█████╗░██████╗░██████╗░░█████╗░██████╗░██╗░░░░░██╗░██████╗████████╗  ░█████╗░██████╗░██╗
// ██║░░██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║░░░░░██║██╔════╝╚══██╔══╝  ██╔══██╗██╔══██╗██║
// ███████║██║░░██║██████╔╝██████╔╝██║░░██║██████╔╝██║░░░░░██║╚█████╗░░░░██║░░░  ███████║██████╔╝██║
// ██╔══██║██║░░██║██╔══██╗██╔══██╗██║░░██║██╔══██╗██║░░░░░██║░╚═══██╗░░░██║░░░  ██╔══██║██╔═══╝░██║
// ██║░░██║╚█████╔╝██║░░██║██║░░██║╚█████╔╝██║░░██║███████╗██║██████╔╝░░░██║░░░  ██║░░██║██║░░░░░██║
// ╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝╚═════╝░░░░╚═╝░░░  ╚═╝░░╚═╝╚═╝░░░░░╚═╝

// Backend version 0.0.1

// Created by nouhidev
const noblox = require("noblox.js")

// Express Server Setup
const express = require('express')
const proxy = require('express-http-proxy');
const port = 8080

const cors = require("cors");
const morgan = require("morgan");

const app = express()

app.use(morgan("angle"));
app.use(cors());

// GETs game info via Noblox using Roblox's API by the Universe ID
app.get('/game-info/:id', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const game_info = await noblox.getUniverseInfo([ req.params['id'] ]);
    res.send(game_info);
});

// GETs game icon using Roblox's Thumbnails API v1 by the Universe ID
app.get('/game-icon/:id', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    await fetch(`https://thumbnails.roblox.com/v1/places/gameicons?placeIds=${req.params['id']}&returnPolicy=PlaceHolder&size=50x50&format=Png&isCircular=false`)
            .then((response) => response.json())
            .then((json) => {
                res.json(json);
            });
});

app.listen(port, () => {
    console.log(`Roblox Horrorlist API Server listening on port ${port}`)
});