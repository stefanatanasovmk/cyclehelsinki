import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpError from "../../utils/errors/HttpError";
import StationService from "./station.service";

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
  }

  //Controller for fetching all the Stations in the db
  private getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const stations = await this.StationService.getAll();
      res.status(200).json(stations);
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
      const station = await this.StationService.getOne(id);
      res.status(200).json(station);
    } catch (e) {
      next(new HttpError(500, "Problems with the server, please try again"));
    }
  };
}
