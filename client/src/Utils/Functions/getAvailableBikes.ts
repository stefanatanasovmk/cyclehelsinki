export default async function getAvailableBikes(
  stationId: string | undefined
): Promise<
  { data: { bikeRentalStation: { bikesAvailable: string } } } | undefined
> {
  try {
    if (stationId !== undefined) {
      const query = `
        {
          bikeRentalStation(id:"${stationId}") {
               bikesAvailable
               
           }
     }
          `;
      const res = await fetch(
        "https://api.digitransit.fi/routing/v1/routers/finland/index/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );
      return await res.json();
    }
  } catch (err) {
    return undefined;
  }
}
