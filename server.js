const express = require("express");
const request = require("request");
const connectDB = require("./config/db");
const barCode = require("./models/Barcode");
const app = express();

require("dotenv").config();

connectDB();

const PORT = process.env.PORT;
const api_key = process.env.API_KEY;

app.get("/api", async (req, res) => {
  const barCodeNumber = req.query.code;
  const url = `http://api.ean-search.org/api?token=${api_key}&op=barcode-lookup&format=json&ean=${barCodeNumber}`;

  request({ url, json: true }, (error, response) => {
    if (error) return res.send("Unable to fetch data!");
    res.send(response.body[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}!`);
});
