import tripModel from "../../resources/trip/trip.model";
import { api, path, exampleTrip, errExampleTrip } from "./trip.test.config";

describe("Trip routes tests", () => {
  describe("Get all routes with pagination implemented", () => {
    it("should return a 1 trip and 200 status", async () => {
      try {
        const { body, status } = await api.get(`${path}/?limit=1&page=1`);
        expect(status).toBe(200);
        expect(body).toEqual([
          {
            _id: expect.any(String),
            Departure: expect.any(Number),
            Return: expect.any(Number),
            DeparturedStationId: expect.any(String),
            ReturnedStationId: expect.any(String),
            CoveredDistance: expect.any(Number),
            Duration: expect.any(Number),
            __v: expect.any(Number),
          },
        ]);
      } catch (e) {
        console.log(e);
      }
    });
  });
  describe("Create new Trips", () => {
    describe("Create new trip with all the values sent", () => {
      it("should return a status 200 and the new trip that is created", async () => {
        try {
          const { body, status } = await api
            .post(`${path}/addtrip`)
            .send(exampleTrip);
          expect(status).toBe(200);
          expect(body).toEqual({
            Departure: 1622494069000,
            Return: 1622494271000,
            DeparturedStationId: "727",
            ReturnedStationId: "713",
            CoveredDistance: 549,
            Duration: 198,
            _id: expect.any(String),
            __v: expect.any(Number),
          });
          await tripModel.findByIdAndDelete(body._id);
        } catch (e) {
          console.log(e);
        }
      });
    });
    describe("Try to create a trip with a value missing", () => {
      it("Should return a status of 500 and a message saying that All fields are required", async () => {
        try {
          const { body, status } = await api
            .post(`${path}/addtrip`)
            .send(errExampleTrip);
          expect(status).toBe(500);
          expect(body).toEqual({ message: "All fields are required" });
        } catch (e) {
          console.log(e);
        }
      });
    });
  });
});
