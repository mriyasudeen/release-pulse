const express = require("express");
const cors = require("cors");

const releaseRoutes = require("./routes/releases");
const metricsRoutes = require("./routes/metrics");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "release-pulse"
  });
});

app.use("/api/releases", releaseRoutes);
app.use("/api/metrics", metricsRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Release Pulse listening on ${port}`);
});