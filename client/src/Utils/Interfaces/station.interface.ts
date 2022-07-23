export default interface Station extends Document {
  _id: string;
  Nimi: string;
  Namn: string;
  Name: string;
  Osoite: string;
  Adress: string;
  Kaupunki: string;
  Stad: string;
  Operaattor: string;
  Kapasiteet: string;
  Location: {
    type: string;
    coordinates: [number, number];
  };
  timestamp: Date;
}
