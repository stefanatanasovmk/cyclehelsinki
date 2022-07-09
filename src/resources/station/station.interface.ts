import { Document, ObjectId } from "mongoose";

export default interface Station extends Document {
  Nimi: String;
  Namn: String;
  Name: String;
  Osoite: String;
  Adress: String;
  Kaupunki: String;
  Stad: String;
  Operaattor: String;
  Kapasiteet: String;
  Location: {
    type: string;
    coordinates: Array<number>;
  };
  TripsDepartedFrom: ObjectId[];
  TripReturnedTo: ObjectId[];
  timestamp: Date;
}
