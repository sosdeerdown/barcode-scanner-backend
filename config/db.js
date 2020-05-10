const mongoose = require("mongoose");

require("dotenv").config();
var options = { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  keepAlive: 300000,
  connectTimeoutMS: 30000 
};
const db = process.env.mongoURI;
const connectDB = async () => {
  try {
    await mongoose.connect(db, options);
    console.log("Db is connected...");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
