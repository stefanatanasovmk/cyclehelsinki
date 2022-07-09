import { Schema, model } from "mongoose";
import Trip from "./trip.interface";

const TripSchema = new Schema({
  Departure: {
    type: Number,
  },
  Return: {
    type: Number,
  },
  DeparturedStation: {
    type: Schema.Types.ObjectId,
    ref: "Route",
  },
  ReturnedStation: {
    type: Schema.Types.ObjectId,
    ref: "Route",
  },
  CoveredDistance: Number,
  Duration: Number,
});

export default model<Trip>("Trip", TripSchema);
