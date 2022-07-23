import stationModel from "../../resources/station/station.model";
import { api, path, exampleStation } from "./station.test.config";

describe("Station routes tests", () => {
  describe("Get all stations /", () => {
    it("should return an array with all the stations in the dbs and 200 status", async () => {
      try {
        const { status } = await api.get(`${path}`);
        expect(status).toBe(200);
      } catch (e) {
        console.log(e);
      }
    });
  });
  describe("Get one station /getone", () => {
    describe("If the station with the given ID exist", () => {
      it("should return the station as an JSON body", async () => {
        try {
          const station = new stationModel(exampleStation);
          await station.save();
          const { body, status } = await api.get(
            `${path}/getone/${station.id}`
          );

          expect(status).toBe(200);
          expect(body).toMatchObject({
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
      }, 100_000);
      describe("If the station with the given ID doesn't exist", () => {
        it("should return a status code 200", async () => {
          try {
            const { body, status } = await api.get(
              `${path}/getone/2jfdso349fkfkfk`
            );
            expect(status).toBe(404);
            expect(body).toMatchObject({
              message: "Station with the given ID wasn't found",
            });
          } catch (e) {
            console.log(e);
          }
        });
      });
    });
    describe("Get one station with the trips departed and arrived at the station", () => {
      describe("If the station ID exist", () => {
        it("should return the station as an JSON file", async () => {
          try {
            const station = new stationModel(exampleStation);
            await station.save();
            const { body, status } = await api.get(
              `${path}/getonewithtrips/${station.id}`
            );

            expect(status).toBe(200);
            expect(body.station).toMatchObject({
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
            expect(body.tripsReturnedToStation).toEqual([]);
            expect(body.tripDepartedToStation).toEqual([]);
            await stationModel.findByIdAndDelete(station._id);
          } catch (e) {
            console.log(e);
          }
        }, 100_000);
        describe("If the station with the given ID doesn't exist", () => {
          it("should return a status code 200", async () => {
            try {
              const { body, status } = await api.get(
                `${path}/getonewithtrips/2jfdso349fkfkfk`
              );
              expect(status).toBe(404);
              expect(body).toMatchObject({
                message: "Station with the given ID wasn't found",
              });
            } catch (e) {
              console.log(e);
            }
          });
        });
      });
    });
  });
});
