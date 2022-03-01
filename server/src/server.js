const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const cluster = require("cluster");
cluster.schedulingPolicy = cluster.SCHED_RR;
dotenv.config();

const { loadPlanetsData } = require("./models/planets.model");
const PORT = process.env.PORT || 5000;

const MONGO_URL = `mongodb+srv://nasa-api:yQjgfCJ47KyIR4zF@nasacluster.iltcq.mongodb.net/nasa?retryWrites=true&w=majority`;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready !");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
