const express = require("express");
const { db } = require("./models/index")
const reminderRouter = require("./routes/reminders")
const petRouter = require("./routes/pets")

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/api/tasks")
})

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/reminder", reminderRouter)
app.use("/api/pets", petRouter)

db.sync().then(()=>{
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
