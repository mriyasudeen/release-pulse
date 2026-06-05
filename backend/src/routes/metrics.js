const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const dataFile = path.join(
  __dirname,
  "../../data/releases.json"
);

router.get("/", (req, res) => {
  const releases = JSON.parse(
    fs.readFileSync(dataFile, "utf8")
  );

  const total = releases.length;

  const successful = releases.filter(
    release => release.status === "success"
  ).length;

  const failed = releases.filter(
    release => release.status === "failed"
  ).length;

  res.json({
    total,
    successful,
    failed
  });
});

module.exports = router;