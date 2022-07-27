export default function parseDate(date: number) {
  return new Date(date)
    .toLocaleString("fi", { timeZone: "Europe/Helsinki" })
    .replace("T", " ")
    .replace("Z", " ")
    .replace(".000", "");
}

//This function accept a date, which is a number and return a formated date in the format of "dd.mm.yyyy hh:mm:ss".