
export default function getColor():string {
  const RGB1 = `${Math.floor(Math.random() * (255 - 120)) + 120}`;
  const RGB2 = `${Math.floor(Math.random() * (255 - 120)) + 120}`;
  const RGB3 = `${Math.floor(Math.random() * (255 - 120)) + 120}`;
  return `rgb(${RGB1},${RGB2},${RGB3})`;
}
