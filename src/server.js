import express from "express";
import mongoose from "mongoose";
import TinderCards from "../dbCards.js";
import Cors from "cors";
// App config
const app = express();
const port = process.env.PORT || 3001;

import "dotenv/config";
const connection_url =
	"mongodb+srv://admin-pisey:admin-pisey@cluster0.ewjxk.mongodb.net/?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Cors({ origin: "https://tinder-frontend-6dfcd.web.app/" }));
// DB config
mongoose.connect(connection_url);

// API Endpoints
app.get("/", (req, res) => {
	res.status(200).send("Hello World!");
});
app.get("/favicon.ico", (req, res) => {
	res.redirect("/");
});

app.post("/tinder/cards", (req, res) => {
	const dbCards = req.body;

	TinderCards.create(dbCards, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.get("/tinder/cards", (req, res) => {
	TinderCards.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

// Listener
app.listen(port, () => {
	console.log(`listening on localhost: ${port}`);
});
