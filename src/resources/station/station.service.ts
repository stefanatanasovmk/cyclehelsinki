import stationModel from "./station.model";
import Station from "./station.interface";
import HttpError from "../../utils/errors/HttpError";
import tripModel from "../trip/trip.model";

export default class StationService {
  private station = stationModel;
  private trip = tripModel;

  //Service for finding and returning all the Stations in the database
  public async getAll(): Promise<Station[]> {
    try {
      return await this.station.find();
      // .limit(2 * 1)
      // .skip((1 - 1) * 2);
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
  ): Promise<[number, Station[]] | [number, object]> {
    try {
      const station = await this.station.findById(id);
      if (station !== null && station !== undefined) {
        const trips = await this.trip.find({ DeparturedStationId: id });
        const stationsIds: any = [];
        trips.forEach((trip) => {
          stationsIds.push(trip.ReturnedStationId);
        });

        const stationsCount = stationsIds.reduce((acc: any, curr: any) => {
          if (acc[curr]) {
            acc[curr]++;
          } else {
            acc[curr] = 1;
          }
          return acc;
        }, {});
        const stationsSorted = Object.keys(stationsCount)
          .map((key) => ({
            key,
            value: stationsCount[key],
          }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);
        let stations: Station[] = [];
        for (let e of stationsSorted) {
          const foundStation: Station | null = await this.station.findById(
            e.key
          );
          if (foundStation !== null && foundStation !== undefined) {
            stations.push(foundStation);
          }
        }
        return [200, stations];
      } else {
        return [500, { message: "Station with the given ID wasn't found" }];
      }
    } catch (e) {
      throw new Error();
    }
  }
}
