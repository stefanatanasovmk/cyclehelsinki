import tripModel from "./trip.model";
import stationModel from "../station/station.model";
import Trip from "./trip.interface";
import mongoose from "mongoose";

export default class TripService {
  private trip = tripModel;
  private station = stationModel;

  //Service for fetching one trip and the stations from where the trip departured and returned to
  public async getOne(id: string): Promise<Trip | string> {
    try {
      const trip = await this.trip.findById(id);
      if (typeof trip !== "undefined" && trip !== null) {
        return trip;
      } else {
        return "Trip with the given ID wasn't found";
      }
    } catch {
      throw new Error();
    }
  }

  //Service for fetching one trip, which return the trip itself including the departure and the return station of the trip
  public async getOneWithStations(id: string): Promise<Object | string> {
    try {
      const trip = await this.trip.findById(id);
      if (typeof trip !== "undefined" && trip !== null) {
        const departureStation = await this.station.findById(
          trip.DeparturedStationId
        );
        const returnStation = await this.station.findById(
          trip.ReturnedStationId
        );
        return { trip, departureStation, returnStation };
      } else {
        return "Trip with the given ID wasn't found";
      }
    } catch {
      throw new Error();
    }
  }

  //Service for fetching all the trips, with implemented pagination
  public async getAll(page: number, limit: number): Promise<Trip[] | string> {
    try {
      const trips = await this.trip
        .find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
      if (typeof trips !== "undefined" && trips !== null) {
        return trips;
      } else {
        return "We couldn't load the trips, please try again...";
      }
    } catch {
      throw new Error();
    }
  }

  //Service for creating new trip
  public async addTrip(body: object): Promise<Trip | string> {
    try {
      const newTrip = new this.trip({ ...body });
      await newTrip.save();
      return newTrip;
    } catch {
      throw new Error();
    }
  }
}
