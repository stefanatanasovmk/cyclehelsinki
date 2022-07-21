export default function secondsToTime(e: number): string {
  const h = Math.floor(e / 3600)
      .toString()
      .padStart(2, "0"),
    m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, "0");
  console.log(e);
  // return h + ":" + m + ":" + s;
  return `${h}:${m}:${s}`;
}
