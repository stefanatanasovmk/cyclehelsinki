import { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Style/Map.css";
import Station from "../Utils/Interfaces/station.interface";
import FindUserLocationBtn from "./FindUserLocationBtn";
import UserLocationMarker from "./UserLocationMarker";
import SearchBar from "./SearchBar";
import getStations from "../Utils/Functions/getStations";
import Loading from "../Loading/MapLoading";
import Context from "../Utils/context/context";
import Stations from "./Stations";
import MarkerCircles from "./MarkerCircles";
import AddStationBtn from "./AddStationBtn";
import Routing from "./Routing";
import CloseNav from "./CloseNav";
import RouteStats from "./RouteStats";

interface Props {
  setIsAddStationOpen: (isAddStationOpen: boolean) => void;
}

export default function Map({ setIsAddStationOpen }: Props): JSX.Element {
  //All the stations from the API
  const [stations, setStations] = useState<Station[] | []>([]);

  //Starting longitute and latitude of the map and also longitute and latitude of the user once he asked for directions or to be located on the map
  const [longLat, setLongLat] = useState<[number, number]>([60.1699, 24.9384]);
  const [doesUserHaveLocation, setDoesUserHaveLocation] =
    useState<boolean>(false);

  //SearchStation is the input controller for the Autocomplete bar, isStationSearched is the boolean that checks if the user has searched for a station and if the station is found and the searchedStation is the station that the user has searched for
  const [searchStation, setSearchStation] = useState<string | undefined>();
  const [isStationSearched, setIsStationSearched] = useState<boolean>(false);
  const [searchedStation, setSearchedStation] = useState<Station[] | []>([]);

  const [loading, setLoading] = useState<boolean>(true);

  //Did the user ask for directions is the boolean that turn true when the user ask for direction, and toLongLat is the longitude and latitude of the station that the user wants to go to
  const [didUserAskedDirections, setDidUserAskedDirections] =
    useState<boolean>(false);
  const [toLongLat, setToLongLat] = useState<[number, number]>([0, 0]);
  const [routeStats, setRouteStats] = useState<{
    totalDistance: number;
    totalTime: number;
  }>({ totalDistance: 0, totalTime: 0 });

  const { setPopup } = useContext(Context);

  function handleDirections(toLong: number, toLat: number) {
    setDidUserAskedDirections(false);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setToLongLat([toLong, toLat]);
          setLongLat([position.coords.latitude, position.coords.longitude]);
          setDoesUserHaveLocation(true);
          setDidUserAskedDirections(true);
        },
        () => {
          setPopup("You need to allow us to use your location", "warning");
        }
      );
    } else {
      setPopup("Your browser does not support geolocation", "warning");
    }
  }

  function handleStationSearch(value: string): void {
    if (value !== undefined && value !== "") {
      setSearchStation(value);
      setIsStationSearched(true);
      setSearchedStation(
        stations.filter((e) =>
          e.Name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setIsStationSearched(false);
    }
  }

  useEffect(() => {
    getStations()
      .then((data) => setStations(data.data))
      .catch((e) => setPopup(e.response.data.message, "error"))
      .finally(() => setLoading(false));
  }, [setPopup]);

  return (
    <div className="MapDiv">
      {loading ? (
        <Loading />
      ) : (
        <MapContainer
          className="map"
          center={[longLat[0], longLat[1]]}
          zoom={16}
          scrollWheelZoom={true}
        >
          {/* Tiles of the map, the attribution and the url are defined at the bottom of this file, after the component */}
          <TileLayer attribution={attribution} url={url} />

          {/* This is the route on the map when user ask for direction to specific station*/}
          {didUserAskedDirections && (
            <>
              <Routing
                props={{
                  fromLong: longLat[1],
                  fromLat: longLat[0],
                  toLong: toLongLat[0],
                  toLat: toLongLat[1],
                  setRouteStats: setRouteStats,
                }}
              />
              <RouteStats routeStats={routeStats} />
            </>
          )}

          {/* Stations Markers */}
          <Stations
            stations={stations}
            isSearched={isStationSearched}
            searchedStation={searchedStation}
            getDirections={handleDirections}
          />

          {/* When user ask for locating him, this is the user location marker */}
          {doesUserHaveLocation && <UserLocationMarker coordinates={longLat} />}

          {/* This is the marker circles that appear when user search for a specific station */}
          {isStationSearched && (
            <MarkerCircles
              coordinates={[
                searchedStation[0].Location.coordinates[1],
                searchedStation[0].Location.coordinates[0],
              ]}
            />
          )}

          {/* This is the close button and legend of the MarkerCircles and the meaning of it when user ask for his location, when search speicif station or when ask for directions */}
          {doesUserHaveLocation ||
          isStationSearched ||
          didUserAskedDirections ? (
            <CloseNav
              setDidUserAskedDirections={setDidUserAskedDirections}
              setDoesUserHaveLocation={setDoesUserHaveLocation}
              setIsSearched={setIsStationSearched}
            />
          ) : null}

          <AddStationBtn setIsAddStationModalOpen={setIsAddStationOpen} />

          <FindUserLocationBtn
            position={"topleft"}
            setPopup={setPopup}
            setDoesUserHaveLocation={setDoesUserHaveLocation}
            setLongLat={setLongLat}
          />

          {/* The station search autocomplete bar */}
          <SearchBar
            stations={stations}
            onSearch={handleStationSearch}
            value={searchStation}
          />
        </MapContainer>
      )}
    </div>
  );
}

const attribution =
  '&copy; <a target="_blank" href="https://carto.com/basemaps/">Carto Basemaps</a> contributors';
const url =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png";
// const url =
//   "https://{s}.api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=e6dSIOgfOVoHrCtSwAfia44QVeAODWPO";
