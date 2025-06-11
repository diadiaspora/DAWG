const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const planSchema = mongoose.Schema({
  month: { type: String },
  day: { type: Number },
  year: { type: Number },
  age: { type: Number },
  month: { type: String },
  destination: { type: Number },
  notes: { type: String },
  checkIn: { type: Date },
  checkIn: { type: Date },
  address: { type: String },
  airline: { type: String },
  outboundFlightNUmber: { type: String },
  outboundDate: { type: Date },
  outboundDepartureTime: { type: Date },
  outboundArrivalTime: { type: Date },
  returnFlighNumber: { type: String },
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
