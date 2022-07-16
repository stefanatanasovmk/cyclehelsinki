import { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import ".././Style/Map.css";
import Station from "../../Utils/Interfaces/station.interface";
import StationMarker from "./StationMarker";
import FindUserLocationControl from "./FindUserLocationControl";
import UserLocationMarker from "./UserLocationMarker";
import SearchBar from "./SearchBar";
import SearchedStation from "./SearchedStation";
import getStations from "../../Utils/Functions/getStations";
import Loading from "../../Loading/MapLoading";
import Context from "../../context/context";
import getAvailableBikes from "../../Utils/Functions/getAvailableBikes";
export default function Map(): JSX.Element {
  const [stations, setStations] = useState<Station[] | []>([]);
  const [longLat, setLongLat] = useState<[number, number]>([60.1699, 24.9384]);
  const [doesUserHaveLocation, setDoesUserHaveLocation] =
    useState<boolean>(false);

  const [search, setSearch] = useState<string | undefined>();
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [searchedStations, setSearchedStations] = useState<Station[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { setPopup } = useContext(Context);

  function findLocation(): [number, number] {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongLat([position.coords.latitude, position.coords.longitude]);
          setDoesUserHaveLocation(true);
        },
        () => {
          setPopup("You need to allow us to use your location");
        }
      );
    } else {
      setPopup("Your browser does not support geolocation");
    }
    return [longLat[0], longLat[1]];
  }
  function searchStation(value: string): void {
    if (value !== undefined) {
      setSearch(value);
      setIsSearched(true);
      setSearchedStations(
        stations.filter((e) =>
          e.Name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setIsSearched(false);
      setSearch(value);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStations();
        for (let e of res.data) {
          const bikesAvailable = await getAvailableBikes(e._id);
          if (bikesAvailable !== null && bikesAvailable !== undefined) {
            e.bikesAvailable =
              bikesAvailable.data?.bikeRentalStation?.bikesAvailable;
          }
        }
        setStations(res.data);
        setLoading(false);
      } catch (e: any) {
        setPopup(e.response.data.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [setPopup]);

  return (
    <div className="MapDiv">
      {loading ? (
        <Loading />
      ) : (
        <MapContainer
          className="map"
          center={[longLat[0], longLat[1]]}
          zoom={11}
          scrollWheelZoom={true}
        >
          <TileLayer attribution={attribution} url={url} />

          {!isSearched ? (
            stations.map((e) => (
              <StationMarker
                id={e._id}
                key={e._id}
                Name={e.Name}
                Osoite={e.Adress}
                Kapasiteet={e.Kapasiteet}
                coordinates={[
                  e.Location.coordinates[1],
                  e.Location.coordinates[0],
                ]}
                bikesAvailable={
                  e.bikesAvailable !== undefined ? e.bikesAvailable : "0"
                }
              />
            ))
          ) : (
            <SearchedStation
              station={searchedStations}
            />
          )}

          {doesUserHaveLocation && <UserLocationMarker coordinates={longLat} />}

          <FindUserLocationControl
            pos={"topleft"}
            onClick={findLocation}
            isLocationShared={doesUserHaveLocation}
          />

          <SearchBar
            stations={stations}
            onSearch={searchStation}
            value={search}
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
