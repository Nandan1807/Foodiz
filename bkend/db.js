const mongoose = require("mongoose");
const mongourl = "mongodb+srv://nandanjoshi1807:nandan18@cluster0.h6l4wsb.mongodb.net/foodiz?retryWrites=true&w=majority&appName=AtlasApp";

const mongoDb = async () => {
  try {
    await mongoose.connect(mongourl, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDb;
