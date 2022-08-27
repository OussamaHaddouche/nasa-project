const launches = new Map();

const launch1 = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("27 Decembre, 2030"),
  destination: "Kepler-442 b",
};
const launch2 = {
  mission: "Kepler Exploration XX",
  rocket: "Explorer IS2",
  launchDate: new Date("27 october, 2040"),
  destination: "Kepler-442 b",
};

addNewLaunch(launch1);
addNewLaunch(launch2);

function checkLaunchExistenceByFlightNumber(flightNumber) {
  console.log(launches);
  return launches.has(flightNumber);
}

function getAllLaunches() {
  return [...launches.values()];
}

function addNewLaunch(launch) {
  const flightNumber = launches.size + 1;
  launches.set(flightNumber, {
    flightNumber,
    customers: ["NASA"],
    upcoming: true,
    success: true,
    ...launch,
  });
}

function removeLaunch(flightNumber) {
  const abortedLaunch = launches.get(flightNumber);
  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;
  return abortedLaunch;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  removeLaunch,
  checkLaunchExistenceByFlightNumber,
};
