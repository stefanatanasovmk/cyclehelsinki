# CycleHelsinki.fi

This is a project build for an exercise given by Solita, here you can find the exercise and the neccessary data to build and run this project locally:
**https://github.com/solita/dev-academy-2022-fall-exercise**

## Project structure

The backend of this project is build with Express.js and it is in /src directory. The frontend is build with React and you can find it in /client directory.

To run the project it is required to provide an .env file in the root directory, where you will need to define:

### **PORT=**

### **MONGO_DB_PATH=**

The required software to build and run the project locally:

**Node ~ v16.13.2**

**MongoDB ~ v5.0.5**

**Typescript ~ v4.7.4**

\*The software versions mentioned above are the one that I'm using on my local machine and on the cloud where the website is deployed.

## Run the project locally

### 1. Clone the directory on your local machine.

> git clone https://github.com/stefanatanasovmk/cyclehelsinki.git

### 2. Install the dependencies

- In the root directory:

> npm install --include=dev

- cd into ~/client directory

> npm install --include=dev

### 3. in ~/src/insert-data in files **"insert2021-05.ts"**, **"insert2021-06.ts"**, **"insert2021-07.ts"**, you will need to specify the path where your journeys CSV files are stored. In **"insertStations.ts"** you will need to specify the path where your stations CSV file is stored.

### 4. Compile the code

> npm run build

### 5. Insert data

- Run this command from the root directory:

> ./insertData.sh

### 6. Test the backend

- in the root directory

> npm run test

### 7. Start the backend

- in the root directory

> npm start

### 8. Start the frontend

- in ~/client/package.json change "proxy" to "http://localhost:YOUR-PORT-NUMBER"
- cd into the ~/client directory:

> npm start

**NOTE: Frontend is usually running on port 3000, so the port that you specify in .env file, needs to be different.**

## Run only the frontend locally

### 1. Clone the directory on your local machine.

> git clone https://github.com/stefanatanasovmk/cyclehelsinki.git

### 2. Install the dependencies

- cd into ~/client directory

> npm install --include=dev

### 3. Start the frontend

- in ~/client directory

> npm start

**The backend will run on the cloud.**
