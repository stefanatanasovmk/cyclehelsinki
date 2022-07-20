import tripModel from "./trip.model";
import stationModel from "../station/station.model";
import Trip from "./trip.interface";
import mongoose from "mongoose";

export default class TripService {
  private trip = tripModel;
  private station = stationModel;

  //Service for fetching one trip and the stations from where the trip departured and returned to
  public async getOne(id: string): Promise<[number, Trip] | [number, object]> {
    try {
      const trip = await this.trip.findById(id);
      if (typeof trip !== "undefined" && trip !== null) {
        return [200, trip];
      } else {
        return [500, { message: "Trip with the given ID wasn't found" }];
      }
    } catch {
      throw new Error();
    }
  }

  //Service for fetching one trip, which return the trip itself including the departure and the return station of the trip
  public async getOneWithStations(id: string): Promise<[number, object]> {
    try {
      const trip = await this.trip.findById(id);
      if (typeof trip !== "undefined" && trip !== null) {
        const departureStation = await this.station.findById(
          trip.DeparturedStationId
        );
        const returnStation = await this.station.findById(
          trip.ReturnedStationId
        );
        return [200, { trip, departureStation, returnStation }];
      } else {
        return [500, { message: "Trip with the given ID wasn't found" }];
      }
    } catch {
      throw new Error();
    }
  }

  //Service for fetching all the trips, with implemented pagination
  public async getAll(
    page: number,
    limit: number
  ): Promise<[number, Trip[]] | [number, object]> {
    try {
      const trips = await this.trip
        .find()
        .sort({ Return: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      if (typeof trips !== undefined && trips !== null) {
        return [200, trips];
      } else {
        return [
          500,
          { message: "We couldn't load the trips, please try again..." },
        ];
      }
    } catch {
      throw new Error();
    }
  }

  //Service for creating new trip
  public async addTrip(body: any): Promise<[number, object]> {
    try {
      const {
        Departure,
        Return,
        DeparturedStation,
        ReturnedStation,
        CoveredDistance,
        Duration,
      } = body;
      const now = new Date();
      if (Departure > now.getTime() || Return > now.getTime()) {
        return [500, { message: "Departure or return date is in the future" }];
      }
      if (Duration < 0) {
        return [
          500,
          {
            message:
              "There is something wrong with the departure and return time.",
          },
        ];
      } else {
        const departureStationId = await this.station.findOne({
          Name: DeparturedStation,
        });
        const returnStationId = await this.station.findOne({
          Name: ReturnedStation,
        });
        const newTrip = new this.trip({
          Departure: Departure,
          Return: Return,
          DeparturedStationId: departureStationId,
          ReturnedStationId: returnStationId,
          CoveredDistance: CoveredDistance,
          Duration: Duration,
        });
        await newTrip.save();
        return [200, newTrip];
      }
    } catch {
      throw new Error();
    }
  }
}
