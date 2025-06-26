const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userName: String,
  userPhone: String,
  userEmail: String,
  date: String,
  time: String,
  helperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Helper",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
