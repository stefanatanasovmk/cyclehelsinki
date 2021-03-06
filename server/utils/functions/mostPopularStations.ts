import Station from "../../resources/station/station.interface";
import stationModel from "../../resources/station/station.model";

export default async function mostPopularStations(stationsIds: String[]) {
  const stationsCount = stationsIds.reduce((acc: any, curr: any) => {
    if (acc[curr]) {
      acc[curr]++;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {});

  const stationsSorted = Object.keys(stationsCount)
    .map((key) => ({
      key,
      value: stationsCount[key],
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  let stations: Station[] = [];

  for (let e of stationsSorted) {
    const foundStation: Station | null = await stationModel.findById(e.key);
    if (foundStation !== null && foundStation !== undefined) {
      stations.push(foundStation);
    }
  }

  return stations;
}

//This functions accept an array of strings of the station ids and returns a 5 elements array with the strings are most common in the array given as an argument
