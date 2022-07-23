touch .env
echo "MONGO_DB_PATH=mongodb://localhost:27017/test" >> .env
echo "PORT=4000" >> .env
cat .env
npm install --include=dev
npm run build --if-present
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