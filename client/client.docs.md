### Frontend directory structure:

## Components & Style

- All the components are in ~/src directory. The entry component is index.tsx, which is rendering App.tsx component, which is rendering Home.tsx component where all the parts of the website are rendered.

- All the parts of the website are in separated directory with self-explanatory name. The entry component in every directory is having the same name as the directory itself ex. Map/Map.tsx. Except for AddData where there is two additional directories AddStation & AddTrip. Also, directory Map have additional directory MapPopup where are the map popup components.

- In every component directory where there is native HTML element styled, there is Style directory where all the CSS files are stored, which are named as the component that they are styling ex. Map/RouteStats.tsx native elements are styled in Map/Style/RouteStats.css

- All the native HTML elements are styled in CSS, all the MUI elements are styled in the component itself. Also the "Control" from react-leaflet-custom-control package, is styled in the component itself.

- The responsiveness of all native HTML elements are styled in Home/Style/Home.css, in the same file you can find the path to the component that is styled.

## Utils

- Utils directory is where all the utility are kept. Context as well.

- All the helper functions and API call functions can be found in Utils/Functions, and all of them have self-explanatory names.

- The interfaces for the Station and Trip can be found in Utils/Interfaces

## Map Directions/Routing

- The routing in the app works on OSRM demo server, and it's not suitable for production use.
- Because the routing works on demo server, it's only able to return "by car" directions.
