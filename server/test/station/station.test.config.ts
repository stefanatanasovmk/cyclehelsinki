import supertest from "supertest";
import App from "../../app";
import StationController from "../../resources/station/station.controller";
import TripController from "../../resources/trip/trip.controller";

//This test run on 4001 port
const app = new App(
  [new StationController(), new TripController()],
  Number(4001)
);
const application = app.listen();
const api = supertest(application);

const path = "/api/station";

const exampleStation = {
  _id: "5e8f8f8f8f8f8f8f8f8f8f8f",
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
    type: "Point",
    coordinates: [24.81422, 60.185096],
  },
};

export { api, path, exampleStation };
