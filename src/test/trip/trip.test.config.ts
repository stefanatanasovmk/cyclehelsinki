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

const exampleTrip = {
  Departure: 1622494069000,
  Return: 1622494271000,
  DeparturedStationId: "727",
  ReturnedStationId: "713",
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

export { api, path, exampleTrip, errExampleTrip };
