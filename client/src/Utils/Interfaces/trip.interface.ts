export default interface Trip extends Document {
  _id: string;
  Departure: number;
  Return: number;
  DeparturedStationId: string;
  ReturnedStationId: string;
  CoveredDistance: number;
  Duration: number;
}
