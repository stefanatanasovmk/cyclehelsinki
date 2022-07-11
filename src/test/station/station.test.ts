import stationModel from "../../resources/station/station.model";
import Station from "../../resources/station/station.interface";
import { api, path, exampleStation } from "./station.test.config";
import mongoose from "mongoose";

describe("Station routes tests", () => {
  describe("Get all stations", () => {
    it("should return an array with all the stations in the dbs and 200 status", async () => {
      try {
        const { body, status } = await api.get(`${path}`);
        expect(status).toBe(200);
      } catch (e) {
        console.log(e);
      }
    });
  });
  describe("Get one station", () => {
    describe("If the station with the given ID exist", () => {
      it("should return the station as an JSON file", async () => {
        try {
          const station = new stationModel(exampleStation);
          await station.save();
          const { body, status } = await api.get(
            `${path}/getone/${station.id}`
          );

          expect(status).toBe(200);

          expect(body.station).toStrictEqual({
            _id: expect.any(String),
            Nimi: "Innopoli",
            Namn: "Innopoli",
            Name: "Innopoli",
            Osoite: "Somekatutie 20",
            Adress: "Somekatutie 20",
            Kaupunki: "Helsinki",
            Stad: "Helsinki",
            Operaattor: "CityBiki Finland",
            Kapasiteet: "20",
            Location: expect.any(Object),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(Number),
          });
          await stationModel.findByIdAndDelete(station._id);
        } catch (e) {
          console.log(e);
        }
      });
    });
  });
});
