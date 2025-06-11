const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const planSchema = mongoose.Schema({
  month: { type: String },
  day: { type: String},
  year: { type: String },
  destination: { type: String },
  notes: { type: String },
  checkIn: { type: Date },
  checkOut: { type: Date },
  address: { type: String },
  airline: { type: String },
  outboundFlightNumber: { type: String },
  outboundDate: { type: Date },
  outboundDepartureTime: { type: Date },
  outboundArrivalTime: { type: Date },
  returnFlightNumber: { type: String },
  returnDate: { type: Date },
  returnDepartureTime: { type: Date },
  returnArrivalTime: { type: Date },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Plan = mongoose.model("Plan", planSchema);
  
module.exports = Plan;
