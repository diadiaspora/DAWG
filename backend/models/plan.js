const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const planSchema = mongoose.Schema({
  month: { type: String },
  day: { type: String },
  year: { type: String },
  destination: { type: String },
  notes: { type: String },
  checkIn: { type: Date },
  checkOut: { type: Date },
  receipt: { type: String, default: "https://i.imgur.com/KTEjbsw.png" },
  address: { type: String },
  airline: { type: String },
  outboundFlightNumber: { type: String },
  outboundDate: { type: String },
  outboundDepartureTime: { type: String },
  outboundArrivalTime: { type: String },
  returnFlightNumber: { type: String },
  returnDate: { type: Date },
  returnDepartureTime: { type: String },
  returnArrivalTime: { type: String },
  ticket: { type: String, default: "https://i.imgur.com/KTEjbsw.png" },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Plan = mongoose.model("Plan", planSchema);
  
module.exports = Plan;
