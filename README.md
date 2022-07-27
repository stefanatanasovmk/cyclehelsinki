# CycleHelsinki.fi

This is a project build for an exercise given by Solita, here you can find the exercise and the neccessary data for the project
**https://github.com/solita/dev-academy-2022-fall-exercise**

## Project structure

The backend of this project is build with Express.js and it is in /server directory. The frontend is build with React and you can find it in /client directory.

The required software to build and run the project locally:

`Node ~ v16.13.2`
`MongoDB ~ v5.0.5`
`Typescript ~ v4.7.4`

\*The software versions mentioned above are the one that I'm using on my local machine and on the cloud where the website is deployed.

## Run the entire project locally

### 1. Clone the directory on your local machine.

> git clone https://github.com/stefanatanasovmk/cyclehelsinki.git

### 2. in ~/src/insert-data in files:

`insert2021-05.ts`
` insert2021-06.ts`
`insert2021-07.ts`

- you will need to specify the path where your journeys CSV files are stored. In **"insertStations.ts"** you will need to specify the path where your stations CSV file is stored.

`PLEASE MAKE SURE THAT THE PATHS TO YOUR LOCAL CSV FILES ARE CORRECT`

### 3. Build the app

- in the root directory execute buildApp script

> ./buildApp.sh

**Inserting of the data, testing, and building the app should take less than 20 minutes. If everything goes fine, the app should start running on port 4000.**

## Run only the frontend locally

### 1. Clone the directory on your local machine.

> git clone https://github.com/stefanatanasovmk/cyclehelsinki.git

### 2. Build the Frontend

- from the root directory execute buildFrontend script

> ./buildFrontend.sh

**The website should start running on port 3000 on your local machine, and the backend will run on the cloud.**
