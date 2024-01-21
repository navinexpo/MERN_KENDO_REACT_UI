const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();
const port = 4000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.", port);
  }
});

mongoose
  .connect(
    "mongodb+srv://navinexpo2020:M2OHpFzVpnBS3bYM@cluster0.za0utmz.mongodb.net/jwt",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);

console.log();
