import tripModel from "./trip.model";
import stationModel from "../station/station.model";
import Trip from "./trip.interface";

export default class TripService {
  private trip = tripModel;
  private station = stationModel;

  public async getOne(id: string): Promise<Trip | string> {
    try {
      const trip = await this.trip.findById(id);
      if (trip !== null) {
        return trip;
      } else {
        return "Trip with the given ID wasn't found";
      }
    } catch (e) {
      throw new Error();
    }
  }
}
