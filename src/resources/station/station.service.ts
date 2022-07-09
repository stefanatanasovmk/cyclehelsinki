import stationModel from "./station.model";
import Station from "./station.interface";
import HttpError from "../../utils/errors/HttpError";

export default class StationService {
  private station = stationModel;

  //Service for finding and returning all the Stations in the database
  public async getAll(): Promise<Station[]> {
    try {
      return await this.station.find();
    } catch (e) {
      throw new Error();
    }
  }

  //Service for finding and returning one Station in the db with given ID
  public async getOne(id: string): Promise<Station | string> {
    try {
      const station = await this.station.findById(id);
      if (station !== null) {
        return station;
      } else {
        return "Station with the given ID wasn't found";
      }
    } catch (e) {
      throw new Error();
    }
  }
}
