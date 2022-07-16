import supertest from "supertest";
import App from "../../app";
import StationController from "../../resources/station/station.controller";
import TripController from "../../resources/trip/trip.controller";

//This test run on 4002 port
const app = new App(
  [new StationController(), new TripController()],
  Number(4002)
);
const application = app.listen();
const api = supertest(application);

const path = "/api/trip";
const exampleStationWithStationsNames = {
  CoveredDistance: 549,
  Departure: 1622494069000,
  Return: 1622494271000,
  DeparturedStation: "Hanasaari",
  ReturnedStation: "Hanasaari",
  Duration: 198,
};
const exampleTrip = {
  Departure: 1622494069000,
  Return: 1622494271000,
  DeparturedStationId: "501",
  ReturnedStationId: "501",
  CoveredDistance: 549,
  Duration: 198,
};
const errExampleTrip = {
  Departure: 1622494069000,
  Return: 1622494271000,
  DeparturedStationId: "727",
  ReturnedStationId: "713",
  Duration: 198,
};
const exampleTripWithoutStationsIds = {
  Departure: 1622494069000,
  Return: 1622494271000,
  DeparturedStationId: "",
  ReturnedStationId: "",
  Duration: 198,
};

export {
  api,
  path,
  exampleTrip,
  errExampleTrip,
  exampleTripWithoutStationsIds,
  exampleStationWithStationsNames,
};
