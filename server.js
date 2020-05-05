const express = require("express");
const request = require("request");
const app = express();

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => res.send("API Running"));

// app.use("/api/:barcode", require("./routes/api/api"));

app.get("/api", async (req, res) => {
    //   const barCodeResult = await request({ url: url, json: true });
    const barCodeNumber = (req.query);
    const url = `http://api.ean-search.org/api?token=292c9c1116ff30fb0c2da026fe24c3&op=barcode-lookup&format=json&ean=${barCodeNumber}`;

  request({url, json:true}, ());

  res.send({
    msg: "hello",
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}!`);
});
