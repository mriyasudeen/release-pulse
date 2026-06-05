const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const router = express.Router();

const dataFile = path.join(
  __dirname,
  "../../data/releases.json"
);

function loadReleases() {
  const data = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(data);
}

function saveReleases(releases) {
  fs.writeFileSync(
    dataFile,
    JSON.stringify(releases, null, 2)
  );
}

router.get("/", (req, res) => {
  let releases = loadReleases();

  const environment = req.query.environment;
  const status = req.query.status;

  if (environment) {
    releases = releases.filter(
      release => release.environment === environment
    );
  }

  if (status) {
    releases = releases.filter(
      release => release.status === status
    );
  }

  releases.sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

  res.json(releases);
});

router.post("/", (req, res) => {
  const {
    service,
    environment,
    status,
    confidence,
    notes
  } = req.body;

  if (!service || !environment || !status) {
    return res.status(400).json({
      message:
        "service, environment and status are required"
    });
  }

  const releases = loadReleases();

  const release = {
    id: uuid(),
    service,
    environment,
    status,
    confidence: confidence || 5,
    notes: notes || "",
    createdAt: new Date().toISOString()
  };

  releases.push(release);

  saveReleases(releases);

  res.status(201).json(release);
});

module.exports = router;