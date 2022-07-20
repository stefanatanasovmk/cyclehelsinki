import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpError from "../../utils/errors/HttpError";
import StationService from "./station.service";
import { validator, ValidateSchema } from "../../middleware/dataValidator";

export default class StationController implements Controller {
  public path = "/station";
  public router = Router();
  public StationService = new StationService();

  constructor() {
    this.initializeRoutes();
  }

  //Defining & initializing all the routes for stations API
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getAll);
    this.router.get(`${this.path}/getone/:id`, this.getOne);
    this.router.get(`${this.path}/getonewithtrips/:id`, this.getOneWithTrips);
    this.router.get(
      `${this.path}/getmostpopular/:id/:type`,
      this.getMostPopular
    );
    this.router.post(
      `${this.path}/addstation`,
      validator(ValidateSchema.station),
      this.addStation
    );
  }

  //Controller for fetching all the Stations in the db
  private getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const [status, stations] = await this.StationService.getAll();
      res.status(status).json(stations);
    } catch (e) {
      next(new HttpError(500, "Problems with the server, please try again"));
    }
  };

  //Controler for finding one Station in the db with given param as a ID
  private getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const [status, station] = await this.StationService.getOne(id);
      res.status(status).json(station);
    } catch (e) {
      next(new HttpError(500, "Problems with the server, please try again"));
    }
  };

  //Controler for finding one Station in the db with given param as a ID and finding all the trips that departed and arrived at the station
  private getOneWithTrips = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const [status, stationAndTrips] =
        await this.StationService.getOneWithTrips(id);
      res.status(status).json(stationAndTrips);
    } catch {
      next(new HttpError(500, "Problems with the server, please try again"));
    }
  };

  //Controller for finding the most popular stations for departure and return for trips that have departed or returned to the given station
  private getMostPopular = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, type } = req.params;
      const [status, stations, averageDistance] =
        await this.StationService.getMostPopular(id, type);
      res.status(status).json({ stations, averageDistance });
    } catch {
      next(new HttpError(500, "Problems with the server, please try again"));
    }
  };

  //Controller for adding a new Station to the db
  private addStation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const [status, station] = await this.StationService.addStation(req.body);
      res.status(status).json(station);
    } catch {
      next(new HttpError(500, "Problems with the server, please try again"));
    }
  };
}
