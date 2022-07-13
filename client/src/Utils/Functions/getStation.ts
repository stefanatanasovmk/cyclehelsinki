export default async function getStation(id: string) {
  const data = await fetch(`/api/station/getone/${id}`);
  return await data.json();
}
