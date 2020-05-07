const express = require("express");
const cors = require("cors");
require("dotenv").config();
const request = require("request");
const connectDB = require("./config/db");
const Barcode = require("./models/Barcode");
const app = express();
app.use(cors());

connectDB();

const PORT = process.env.PORT;
const api_key = process.env.API_KEY;

app.use(express.json());

app.post("/api/scan", async (req, res) => {
  console.log("HELLo")
  const barcodeNumber = req.query.code;
  console.log(req);
  const url = `http://api.ean-search.org/api?token=${api_key}&op=barcode-lookup&format=json&ean=${barcodeNumber}`;

  request({ url, json: true }, async (error, response) => {
    if (error) return res.send("Code does not exist.");

    const { ean, name, categoryId, categoryName } = response.body[0];

    try {
      let barcode = await Barcode.findOne({ ean });
      if (barcode) {
        return res.status(400).send("Entry already exists!");
      }

      barcode = new Barcode({
        ean,
        name,
        categoryId,
        categoryName,
      });

      await barcode.save();
      //   res.send("Entry added!");
      res.status(200).send(response.body[0]);
    } catch (error) {
      res.status(500).send("Internal Error!");
    }
  });
});

app.post("/api/add", async (req, res) => {
  const data = { ...req.body };
  const { ean, name, categoryId, categoryName } = data;
  try {
    let barcode = await Barcode.findOne({ ean });
    if (barcode) {
      return res.status(400).send("Entry already exists!");
    }

    barcode = new Barcode({
      ean,
      name,
      categoryId,
      categoryName,
    });

    await barcode.save();
    //   res.send("Entry added!");
    res.status(200).send("Entry Added");
  } catch (error) {
    res.status(500).send("Internal Error!");
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}!`);
});
