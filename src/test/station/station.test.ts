import stationModel from "../../resources/station/station.model";
import Station from "../../resources/station/station.interface";
import { api, path, exampleStation } from "./station.config";

describe("Station routes tests", () => {
  describe("Get all stations", () => {
    it("should return an error with all the stations in the dbs and 200 status", async () => {
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
            `${path}/getone/${station._id}`
          );
          expect(status).toBe(200);
          expect(body._id).toEqual(station.id);
          await stationModel.findByIdAndDelete(station._id);
        } catch (e) {
          console.log(e);
        }
      });
    });
  });
});
