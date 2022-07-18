import Control from "react-leaflet-custom-control";
export default function CirclesColorLegend(): JSX.Element {
  return (
    <Control
      position="bottomleft"
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
      <h5>Colors legend:</h5>
      <div>Red: 100m</div>
      <div>Green: 200m</div>
      <div>Blue: 300m</div>
    </Control>
  );
}
