import { Document, ObjectId } from "mongoose";

export default interface Trip extends Document {
  Departure: number;
  Return: number;
  DeparturedStationId: string;
  ReturnedStationId: string;
  CoveredDistance: number;
  Duration: number;
}
