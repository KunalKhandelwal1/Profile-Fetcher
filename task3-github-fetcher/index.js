import express from "express"
import axios from "axios"
const app = express()
const port = 3000;
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")
app.get("/", (req, res) => {
  res.render("home", { user: null, error: null })
})

app.post("/", async (req, res) => {
  const { username } = req.body
  try {
    const { data } = await axios.get(`https://api.github.com/users/${username}`)
    res.render("home", { user: data, error: null })
  } catch (e) {
    res.render("home", { user: null, error: "User not found" })
  }
})



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
