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
      // .limit(2 * 1)
      // .skip((1 - 1) * 2);
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
      if (typeof station !== undefined && station !== null) {
        return [200, station];
      } else {
        return [500, { message: "Station with the given ID wasn't found" }];
      }
    } catch (e) {
      throw new Error();
    }
  }

  public async getOneWithTrips(id: string): Promise<[number, object]> {
    try {
      const station = await this.station.findById(id);
      if (typeof station !== "undefined" && station !== null) {
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
        return [500, { message: "Station with the given ID wasn't found" }];
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
    | [number, Station[], number]
    | [number, object, number]
    | [number, { message: string }]
  > {
    try {
      const station = await this.station.findById(id);
      if (station !== null && station !== undefined) {
        const tripsLength: number[] = [];
        const stationsIds: String[] = [];
        if (type === "departures") {
          const trips = await this.trip.find({ DeparturedStationId: id });

          trips.forEach((trips: Trip) => {
            stationsIds.push(trips.ReturnedStationId);
            tripsLength.push(trips.CoveredDistance);
          });
        } else if (type === "returns") {
          const trips = await this.trip.find({ ReturnedStationId: id });

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
        return [200, stations, averageDistance];
      } else {
        return [500, { message: "Station with the given ID wasn't found" }];
      }
    } catch (e) {
      throw new Error();
    }
  }


}
