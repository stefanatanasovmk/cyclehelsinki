import mongoose from "mongoose";
import stationModel from "./station.model";
import Station from "./station.interface";
import tripModel from "../trip/trip.model";
import mostPopularStations from "../../utils/functions/mostPopularStations";
import Trip from "../trip/trip.interface";

export default class StationService {
  private station = stationModel;
  private trip = tripModel;

  //Service for finding and returning all the Stations in the database
  public async getAll(): Promise<[number, Station[]]> {
    try {
      const stations = await this.station.find();
      return [200, stations];
    } catch (e) {
      throw new Error();
    }
  }

  //Service for finding and returning one Station in the db with given ID
  public async getOne(
    id: string
  ): Promise<[number, Station] | [number, object]> {
    try {
      const station = await this.station.findById(id);
      if (station !== null && station !== undefined) {
        return [200, station];
      } else {
        return [404, { message: "Station with the given ID wasn't found" }];
      }
    } catch (e) {
      throw new Error();
    }
  }

  //This service is not in use currently.
  //Service for finding one station in the db with given ID and all the trips that have departed or arrived at the station.
  public async getOneWithTrips(id: string): Promise<[number, object]> {
    try {
      const station = await this.station.findById(id);
      if (station !== undefined && station !== null) {
        const tripsReturnedToStation = await this.trip.find({
          DeparturedStationId: station.id,
        });
        const tripDepartedToStation = await this.trip.find({
          ReturnedStationId: station.id,
        });
        return [
          200,
          { station, tripsReturnedToStation, tripDepartedToStation },
        ];
      } else {
        return [404, { message: "Station with the given ID wasn't found" }];
      }
    } catch {
      throw new Error();
    }
  }

  //Service for finding the most popular stations for departure and return for trips that have departed or returned to the given station
  public async getMostPopular(
    id: string,
    type: string
  ): Promise<
    | [number, Station[], number, number]
    | [number, object, number, number]
    | [number, { message: string }]
  > {
    try {
      const station = await this.station.findById(id);
      if (station !== null && station !== undefined) {
        let tripsLength: number[] = [];
        let stationsIds: String[] = [];
        let totalNumberOfTrips: number = 0;
        if (type === "departures") {
          const trips = await this.trip.find({ DeparturedStationId: id });
          totalNumberOfTrips = trips.length;
          trips.forEach((trips: Trip) => {
            stationsIds.push(trips.ReturnedStationId);
            tripsLength.push(trips.CoveredDistance);
          });
        } else if (type === "returns") {
          const trips = await this.trip.find({ ReturnedStationId: id });
          totalNumberOfTrips = trips.length;
          trips.forEach((trips) => {
            stationsIds.push(trips.DeparturedStationId);
            tripsLength.push(trips.CoveredDistance);
          });
        } else {
          throw new Error();
        }
        const averageDistance: number =
          tripsLength.reduce((a, b) => a + b, 0) / tripsLength.length;
        const stations = await mostPopularStations(stationsIds);
        return [200, stations, averageDistance, totalNumberOfTrips];
      } else {
        return [404, { message: "Station with the given ID wasn't found" }];
      }
    } catch (e) {
      throw new Error();
    }
  }

  //Service for adding a new Station

  public async addStation(
    body: Station
  ): Promise<[number, Station] | [number, object]> {
    try {
      if (body !== undefined || body !== null) {
        const [lat, long] = body.Location.coordinates;
        if (long < 59.95 || long > 60.5 || lat < 24.3 || lat > 25.5) {
          return [
            400,
            { message: "Station location needs to be in Uusimaa area" },
          ];
        } else {
          const id = new mongoose.Types.ObjectId();
          const station = new this.station({ _id: id, ...body });
          await station.save();
          return [200, station];
        }
      } else {
        return [400, { message: "All fields are required" }];
      }
    } catch (e) {
      throw new Error();
    }
  }
}
