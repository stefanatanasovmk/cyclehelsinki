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
    } catch (e) {
      throw new Error();
    }
  }

  //Service for finding and returning one Station in the db with given ID
  public async getOne(id: string): Promise<Object | string> {
    try {
      const station = await this.station.findById(id);
      if (station !== null) {
        const departureTripsFromStation = await this.trip.find({
          DeparturedStationId: id,
        });
        const returnedTripsToStation = await this.trip.find({
          ReturnedStationId: id,
        });
        return { station, departureTripsFromStation, returnedTripsToStation };
      } else {
        return "Station with the given ID wasn't found";
      }
    } catch (e) {
      throw new Error();
    }
  }
}
