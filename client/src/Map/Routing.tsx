import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { userIcon } from "./Icons/StationIcon.config";
import greenPin from "./Icons/images/map-location-green.png";

//Icon for the station of the beginning of the route
const stationIcon = L.icon({
  iconUrl: greenPin,
  iconSize: [20, 18],
  iconAnchor: [10, 20],
  popupAnchor: [0, -25],
});

const createRoutineMachineLayer = (props: any) => {
  const waypoints = [
    L.latLng(props.props.fromLat, props.props.fromLong),
    L.latLng(props.props.toLat, props.props.toLong),
  ];

  let instance = L.Routing.control({
    waypoints,

    routeWhileDragging: false,

    showAlternatives: false,

    routeLine: function (route, options) {
      let line = L.Routing.line(route, {
        styles: [
          { color: "salmon", opacity: 1, weight: 6, dashArray: "10,10" },
        ],
        addWaypoints: false,
        extendToWaypoints: false,
        missingRouteTolerance: 10,
      });

      return line;
    },

    plan: L.Routing.plan(waypoints, {
      createMarker: function (i, wp) {
        if (
          wp.latLng.lat === props.props.fromLat &&
          wp.latLng.lng === props.props.fromLong
        ) {
          return L.marker(wp.latLng, {
            draggable: false,
            icon: userIcon,
          });
        } else {
          return L.marker(wp.latLng, {
            draggable: false,
            icon: stationIcon,
          });
        }
      },

      routeWhileDragging: false,
    }),
  }).on("routesfound", function (e) {
    props.props.setRouteStats(e.routes[0].summary);
  });
  return instance;
};

const Routing = createControlComponent(createRoutineMachineLayer);

export default Routing;
