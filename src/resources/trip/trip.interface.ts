import { Document, ObjectId } from "mongoose";

export default interface Trip extends Document {
  Departure: number;
  Return: number;
  DeparturedStationId: String;
  ReturnedStationId: String;
  CoveredDistance: number;
  Duration: number;
}
