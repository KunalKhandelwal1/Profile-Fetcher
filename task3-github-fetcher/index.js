const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", { user: null, error: null });
});

app.post("/", async (req, res) => {
  const username = req.body.username;

  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    res.render("home", { user: response.data, error: null });
  } catch (err) {
    res.render("home", { user: null, error: "User not found" });
  }
});


module.exports = app;
