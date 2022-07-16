export default async function getStation(id: string) {
  if (id !== undefined && id !== null) {
    const data = await fetch(`/api/station/getone/${id}`);
    return await data.json();
  } else {
    return "";
  }
}
