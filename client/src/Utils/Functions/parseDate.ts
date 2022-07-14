export default function parseDate(date: number) {
  return new Date(date)
    .toLocaleString("fi", { timeZone: "Europe/Helsinki" })
    .replace("T", " ")
    .replace("Z", " ")
    .replace(".000", "");
}
