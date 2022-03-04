const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready !");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

const MONGO_URL = `mongodb+srv://nasa-api:yQjgfCJ47KyIR4zF@nasacluster.iltcq.mongodb.net/nasa?retryWrites=true&w=majority`;

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}
module.exports = {
  mongoConnect,
  mongoDisconnect,
};
