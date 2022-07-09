import { Document, ObjectId } from "mongoose";
export default interface Trip extends Document {
  Departure: Number;
  Return: Number;
  DeparturedStation: ObjectId;
  ReturnedStation: ObjectId;
  CoveredDistance: Number;
  Duration: Number;
}
