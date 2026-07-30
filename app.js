const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const petCareDb = require("./db");
require("./models");

const reminderRouter = require("./routes/reminders");
const petRouter = require("./routes/pets");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/reminders", reminderRouter);
app.use("/pets", petRouter);

// app.get("/", (req, res) => {
//   res.redirect("/api/tasks")
// })

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  try {
    await petCareDb.authenticate();
    console.log("DATABASE connected");

    await petCareDb.sync();
    console.log("Models synced");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
}

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Someting went wrong." });
});

startServer();
