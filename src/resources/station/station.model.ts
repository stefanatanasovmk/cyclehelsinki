import { Schema, model } from "mongoose";
import Station from "./station.interface";

const StationSchema = new Schema(
  {
    _id: {
      type: String,
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
  },
  { timestamps: true }
);
export default model<Station>("Station", StationSchema);
