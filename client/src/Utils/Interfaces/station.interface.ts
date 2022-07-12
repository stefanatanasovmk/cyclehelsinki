export default interface Station extends Document {
  _id: string | undefined;
  Nimi: String;
  Namn: String;
  Name: String;
  Osoite: String;
  Adress: String;
  Kaupunki: String;
  Stad: String;
  Operaattor: String;
  Kapasiteet: String;
  Location: {
    type: string;
    coordinates: Array<number>;
  };
  timestamp: Date;
  bikesAvailable: string | undefined;
}
