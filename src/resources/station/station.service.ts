import stationModel from "./station.model";
import Station from "./station.interface";
import HttpError from "../../utils/errors/HttpError";
import tripModel from "../trip/trip.model";
import mostPopularStations from "../../utils/functions/mostPopularStations";
import Trip from "../trip/trip.interface";
export default class StationService {
  private station = stationModel;
  private trip = tripModel;

  //Service for finding and returning all the Stations in the database
  public async getAll(): Promise<Station[]> {
    try {
      return await this.station
        .find()
        .limit(2 * 1)
        .skip((1 - 1) * 2);
    } catch (e) {
      throw new Error();
    }
  }

  //Service for finding and returning one Station in the db with given ID
  public async getOne(id: string): Promise<Station | string> {
    try {
      const station = await this.station.findById(id);
      if (typeof station !== "undefined" && station !== null) {
        return station;
      } else {
        return "Station with the given ID wasn't found";
      }
    } catch (e) {
      throw new Error();
    }
  }

  public async getOneWithTrips(id: string): Promise<Object | string> {
    try {
      const station = await this.station.findById(id);
      if (typeof station !== "undefined" && station !== null) {
        const tripsReturnedToStation = await this.trip.find({
          DeparturedStationId: station.id,
        });
        const tripDepartedToStation = await this.trip.find({
          ReturnedStationId: station.id,
        });
        return { station, tripsReturnedToStation, tripDepartedToStation };
      } else {
        return "Station with the given ID wasn't found";
      }
    } catch {
      throw new Error();
    }
  }

  public async getMostPopularDepartures(
    id: string
  ): Promise<
    | [number, Station[], number]
    | [number, object, number]
    | [number, { message: string }]
  > {
    try {
      const station = await this.station.findById(id);
      if (station !== null && station !== undefined) {
        const trips = await this.trip.find({ DeparturedStationId: id });
        const tripsLength: number[] = [];
        const stationsIds: String[] = [];
        trips.forEach((trips: Trip) => {
          stationsIds.push(trips.ReturnedStationId);
          tripsLength.push(trips.CoveredDistance);
        });
        const averageDistance: number =
          tripsLength.reduce((a, b) => a + b, 0) / tripsLength.length;
        const stations = await mostPopularStations(stationsIds);
        return [200, stations, averageDistance];
      } else {
        return [500, { message: "Station with the given ID wasn't found" }];
      }
    } catch (e) {
      throw new Error();
    }
  }

  public async getMostPopularReturns(
    id: string
  ): Promise<
    | [number, Station[], number]
    | [number, object, number]
    | [number, { message: string }]
  > {
    try {
      const station = await this.station.findById(id);
      if (station !== null && station !== undefined) {
        const trips = await this.trip.find({ ReturnedStationId: id });
        const tripsLength: number[] = [];
        const stationsIds: String[] = [];
        trips.forEach((trips) => {
          stationsIds.push(trips.DeparturedStationId);
          tripsLength.push(trips.CoveredDistance);
        });
        const averageDistance: number =
          tripsLength.reduce((a, b) => a + b, 0) / tripsLength.length;
        const stations = await mostPopularStations(stationsIds);
        return [200, stations, averageDistance];
      } else {
        return [500, { message: "Station with the given ID wasn't found" }];
      }
    } catch (e) {
      throw new Error();
    }
  }
}
