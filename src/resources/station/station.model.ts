import mongoose, { Schema, model } from "mongoose";
import Station from "./station.interface";

const StationSchema = new Schema(
  {
    _id: {
      type: String,
      default: new mongoose.Types.ObjectId(), //if you don't provide unique ID for new Station, MongoDB will assing it itself.
    },
    Nimi: {
      type: String,
    },
    Namn: {
      type: String,
    },
    Name: {
      type: String,
    },
    Osoite: {
      type: String,
    },
    Adress: {
      type: String,
    },
    Kaupunki: {
      type: String,
    },
    Stad: {
      type: String,
    },
    Operaattor: {
      type: String,
    },
    Kapasiteet: {
      type: String,
    },
    Location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [],
    },
    BikesAvailable: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);
export default model<Station>("Station", StationSchema);
