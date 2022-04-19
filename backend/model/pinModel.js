const mongoose = require("mongoose");

const pinSchema = mongoose.Schema(
  {
    pin: {
      type: String,
    },
    unit: {
      type: Number,
    },

    user: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("PIN", pinSchema);
