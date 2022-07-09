import { Schema, model } from "mongoose";
import Station from "./station.interface";

const StationSchema = new Schema(
  {
    OldID: {
      type: Number,
      default: 0,
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
    TripsDepartedFrom: [
      {
        type: Schema.Types.ObjectId,
        ref: "Trip",
      },
    ],
    TripReturnedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "Trip",
      },
    ],
  },
  { timestamps: true }
);
export default model<Station>("Station", StationSchema);
