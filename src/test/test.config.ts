import supertest from "supertest";
import App from "../app";
import StationController from "../resources/station/station.controller";
import Station from "../resources/station/station.interface";
import TripController from "../resources/trip/trip.controller";
import "dotenv/config";

const app = new App(
  [new StationController(), new TripController()],
  Number(4001)
);
const application = app.listen();
const api = supertest(application);

export default api;
