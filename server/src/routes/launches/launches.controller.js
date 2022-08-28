const {
  getAllLaunches,
  addNewLaunch,
  removeLaunch,
  checkLaunchExistenceByFlightNumber,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (Object.values(launch).length !== 4) {
    return res.status(400).json({
      error: "Missing required properties",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "invalid launch Date",
    });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const flightNumber = Number(req.params.flightNumber);
  if (!checkLaunchExistenceByFlightNumber(flightNumber)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const abortedLaunch = removeLaunch(flightNumber);
  return res.status(200).json(abortedLaunch);
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
