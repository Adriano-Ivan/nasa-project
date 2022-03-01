const mongoose = require("mongoose");

const launchSchema = mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});
