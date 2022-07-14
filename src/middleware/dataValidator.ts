import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

export function tripValidator(schema: ObjectSchema) {
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
};
