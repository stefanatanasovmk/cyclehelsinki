touch .env
echo "MONGO_DB_PATH=mongodb://localhost:27017/test" >> .env
echo "PORT=4000" >> .env
cat .env
npm install --include=dev
npm run build --if-present
mkdir csv-files
cd csv-files
curl -L https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv --output 2021-05.csv
curl -L https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv --output 2021-06.csv
curl -L https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv --output 2021-07.csv
curl -L https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv --output stations.csv
cd ..
cd dist/insert-data
node insertStations.js
node insert2021-05.js
node insert2021-06.js
node insert2021-07.js
cd ../..
cd client
npm install --include=dev
npm run build
cd ..
npm test
npm start