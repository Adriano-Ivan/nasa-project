const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const cluster = require("cluster");
cluster.schedulingPolicy = cluster.SCHED_RR;
dotenv.config();

const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
