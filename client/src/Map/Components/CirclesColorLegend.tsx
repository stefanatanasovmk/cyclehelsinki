import { useState, useEffect } from "react";
import Control from "react-leaflet-custom-control";
export default function CirclesColorLegend(): JSX.Element {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 380px)").matches
  );
  useEffect(() => {
    window
      .matchMedia("(min-width: 440px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  return (
    <Control
      position={matches ? "bottomleft" : "topright"}
      style={{
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: "10%",
      }}
    >
      <div>Red: 100m</div>
      <div>Green: 200m</div>
      <div>Blue: 300m</div>
    </Control>
  );
}
