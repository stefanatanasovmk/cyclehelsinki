import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

export function validator(schema: ObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch {
      next(new Error("All fields are required"));
    }
  };
}

//Here you can add more schemas that you want to be validated on patch, put or post request
export const ValidateSchema = {
  trip: Joi.object({
    Departure: Joi.number().required(),
    Return: Joi.number().required(),
    DeparturedStation: Joi.string().required(),
    ReturnedStation: Joi.string().required(),
    CoveredDistance: Joi.number(),
    Duration: Joi.number().required(),
  }),
  station: Joi.object({
    Nimi: Joi.string().required(),
    Namn: Joi.string().required(),
    Name: Joi.string().required(),
    Osoite: Joi.string().required(),
    Adress: Joi.string().required(),
    Kaupunki: Joi.string().required(),
    Stad: Joi.string().required(),
    Operaattor: Joi.string().required(),
    Kapasiteet: Joi.string().required(),
    Location: Joi.object({
      type: Joi.string().required(),
      coordinates: Joi.array().required(),
    }).required(),
  }),
};
