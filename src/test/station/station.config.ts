import supertest from "supertest";
import App from "../../app";
import StationController from "../../resources/station/station.controller";
import Station from "../../resources/station/station.interface";
import TripController from "../../resources/trip/trip.controller";
import "dotenv/config";

const path = "/api/station";
const exampleStation = {
  OldID: 123,
  Nimi: "Innopoli",
  Namn: "Innopoli",
  Name: "Innopoli",
  Osoite: "Somekatutie 20",
  Adress: "Somekatutie 20",
  Kaupunki: "Helsinki",
  Stad: "Helsinki",
  Operaattor: "CityBiki Finland",
  Kapasiteet: "20",
  Location: {
    coordinates: [24.81422, 60.185096],
  },
};

const app = new App(
  [new StationController(), new TripController()],
  Number(process.env.TEST_PORT)
);
const application = app.listen();
const api = supertest(application);

export { api, path, exampleStation };
