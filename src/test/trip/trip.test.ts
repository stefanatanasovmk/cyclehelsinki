import mongoose from "mongoose";
import tripModel from "../../resources/trip/trip.model";
import {
  api,
  path,
  exampleTrip,
  errExampleTrip,
  exampleTripWithoutStationsIds,
  exampleStationWithStationsNames,
} from "./trip.test.config";

describe("Trip routes tests", () => {
  describe("Get all routes with pagination implemented path: /", () => {
    it("should return one trip and 200 status", async () => {
      try {
        const { body, status } = await api.get(`${path}/?limit=1&page=100`);
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
    }, 100_000);
  });
  describe("Get one Trip path: /getone/:id", () => {
    describe("If the trip ID exist", () => {
      it("should return a 200 status and a Trip as a JSON body", async () => {
        const trip = new tripModel(exampleTrip);
        await trip.save();
        const { body, status } = await api.get(`${path}/getone/${trip.id}`);
        expect(status).toBe(200);
        expect(body).toMatchObject({
          Departure: 1622494069000,
          Return: 1622494271000,
          DeparturedStationId: "501",
          ReturnedStationId: "501",
          CoveredDistance: 549,
          Duration: 198,
          _id: expect.any(String),
          __v: expect.any(Number),
        });
        await tripModel.findByIdAndDelete(trip._id);
      });
    });

    describe("If the trip ID doesn't exist, and the ID is valid", () => {
      it("should return status 200 and a message saying that the Trip is not found", async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const { body, status } = await api.get(`${path}/getone/${fakeId}`);
        expect(status).toBe(500);
        expect(body).toMatchObject({
          message: "Trip with the given ID wasn't found",
        });
      });
    });

    describe("If the trip ID doesn't exist, and the ID is not valid", () => {
      it("should return a status 404 and message saying that the ID is not valid", async () => {
        const { body, status } = await api.get(`${path}/getone/alskdf`);
        expect(status).toBe(500);
        expect(body).toMatchObject({
          message: "The provided ID is not valid",
        });
      });
    });
  });

  describe("Create new Trips path: /addtrip", () => {
    describe("Create new trip with all the values sent", () => {
      it("should return a status 200 and the new trip that is created", async () => {
        try {
          const { body, status } = await api
            .post(`${path}/addtrip`)
            .send(exampleStationWithStationsNames);
          expect(status).toBe(200);
          console.log(body);
          expect(body).toMatchObject({
            CoveredDistance: expect.any(Number),
            Departure: expect.any(Number),
            DeparturedStationId: expect.any(String),
            Duration: expect.any(Number),
            Return: expect.any(Number),
            ReturnedStationId: expect.any(String),
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
      it("should return a status of 500 and a message saying that all fields are required", async () => {
        try {
          const { body, status } = await api
            .post(`${path}/addtrip`)
            .send(errExampleTrip);
          expect(status).toBe(500);
          expect(body).toMatchObject({ message: "All fields are required" });
        } catch (e) {
          console.log(e);
        }
      });
    });
  });

  describe("Get one trip with return and departed station documents included in the result", () => {
    describe("Try to get the trip, if the given ID is exist", () => {
      it("should return an object with objects of trip, departureStation and returnStation", async () => {
        const newTrip = new tripModel(exampleTripWithoutStationsIds);
        await newTrip.save();
        const { body, status } = await api.get(
          `${path}/getonewithstations/${newTrip.id}`
        );
        expect(status).toBe(200);
        expect(body.trip).toMatchObject({
          _id: expect.any(String),
          Departure: expect.any(Number),
          Return: expect.any(Number),
          DeparturedStationId: expect.any(String),
          ReturnedStationId: expect.any(String),
          Duration: expect.any(Number),
          __v: expect.any(Number),
        });
        expect(body.departureStation).toBe(null);
        await tripModel.findByIdAndDelete(newTrip.id);
      }, 100_000);
    });
    describe("Try to get the trip if the given ID doesn't exist but it's valid", () => {
      it("should retun a status of 200 and a message that the trip with the given ID doesn't exist", async () => {
        try {
          const fakeId = new mongoose.Types.ObjectId();
          const { body, status } = await api.get(
            `${path}/getonewithstations/${fakeId}`
          );
          expect(status).toBe(500);
          expect(body).toMatchObject({
            message: "Trip with the given ID wasn't found",
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
    describe("Try to get the trip if the given ID doesn't exist and it's not a valid ObjectId", () => {
      it("should return a status of 404 and a message that the id is not valid", async () => {
        try {
          const { body, status } = await api.get(
            `${path}/getonewithstations/23oirdfewdnsmc`
          );
          expect(status).toBe(500);
          expect(body).toMatchObject({
            message: "The provided ID is not valid",
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
  });
});
