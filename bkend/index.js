const express = require("express");
const app = express();
const port = 8000;
const mongoDb = require("./db");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await mongoDb(); 

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.use("/api", require("./Routes/CreateUser"));
    app.use("/api", require("./Routes/DisplayData"));
    app.use("/api", require("./Routes/OrderData"));
    app.use("/api", require("./Routes/ContactUsData"));

    app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();