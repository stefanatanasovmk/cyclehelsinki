export default async function getTrips(length: number, page: number) {
  const data = await fetch(`/api/trip?length=${length}&page=${page}`);
  return await data.json();
}
