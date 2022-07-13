import { Document, ObjectId } from "mongoose";

export default interface Trip extends Document {
  Departure: Number;
  Return: Number;
  DeparturedStationId: String;
  ReturnedStationId: String;
  CoveredDistance: Number;
  Duration: Number;
}
