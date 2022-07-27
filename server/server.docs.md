# Server directory structure

- insert-data is storing everything connected with insertation of the csv files that have been given for this exercise.

- middleware is storing the data validators for saving new Trip and Station, and the error middlewares.

- resources is splited in two separated directories for station and trip, where station and trip interfaces, controllers, model and services are stored.

- test is splited in two separated directories for trip and station unit tests and test configurations.

- in utils is the error, functions and interfaces directories
  -- errors is where HttpError class is defined
  -- in functions is where the function for sorting and filtering the most popular departure and return stations are for a given station
  -- interfaces is where the iterface for app controller is defined.

- entry point of the server is index.ts and the App class which is where the server is structured is in app.ts

# API

## Station API

url = api/station

- GET - / - for getting all the stations fom the database

- GET - /getone/:id - for getting one specific station, it accepts the station id as a param

- GET - /getonewithtrips/:id - for getting one station with all the departure and arrived trips at the station, it accepts station id as a param

- GET - /getmostpopular/:id/:type - for getting 5 most popular departure/return stations for trips started/returned at the station which id shall be given as a param. Accepts station id and type "return"/"departure" as a param.

- POST - /addstation - for adding new station, accepts a JSON file in this format:
  {
  Nimi: string,
  Namn: string,
  Name: string,
  Osoite: string,
  Adress: string,
  Kaupunki: string,
  Stad: string,
  Operaattor: string,
  Kapasiteet: string,
  Location: {
  type: "Point",
  coordinates: [number, number],
  }
  }

## Trip API

url = api/trip

- GET - / - for getting all the routes, with implemented pagination. It accepts "page=number", "limit=number", "from=number", "until=number", "filterby=return/departure".
  "page" is which page of the results is requested,
  "limit" is how much results are requested,
  "from" and "until" should be a miliseconds from ECMAScript epoch, "filterby" should be either "return" or "departure" so it's going to sort the results from the latest return or departure time.
  If no query specified, defaults are:
  page=1,
  limit=20,
  from=${new Date("2021-01-01").getTime()} 
  until=${Date.now()}

- GET - /getone/:id - for getting one trip with the given id, it accepts the trip id as a param.

- GET - /getonewithstations/:id - for getting one trip, and the departure and the return station of the trip. It accepts the trip id as a param

- POST - /addtrip - for adding a new trip, it expect a JSON data in this format:
  {
  Departure: number,
  Return: number,
  DeparturedStation: string(station ID),
  ReturnedStation: string (station ID),
  CoveredDistance: number,
  Duration: number,
  }
