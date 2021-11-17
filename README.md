# OMDB API React Application

### Description

This is simple demonstration app for a React based front-end application that uses the [OMDB API](https://www.omdbapi.com/) to allow users to search for movies, add them to a playlist, modify the playlist, and confirm the playlist.

### Starting the application

This repository is divided into 2 segments - imdb-playlist-app (UI) and server (API).

* To load the UI locally, simply `cd` to imdb-playlist-app and run `npm install` to install all necessary UI packages, followed by `npm run start`. `npm install` only needs to be run once.

* To build the UI and serve it locally via an Express server, remain in this root directory and run `npm run first-start`. This will install all necessary packages (UI and API alike), and then start the build and serve process. This only needs to be run the first time, afterwards running `npm run start` will suffice.

### Packages used

This project uses several packages to improve development efficiecny, including but not limited to:

* react

* react-redux

* redux

* React Material UI (@mui/material) as well as icons from this package

* react-router-dom

* uuid (for generating unique playlist IDs)

* express (for simplicity in routing, as this will be deployed to a cloud based virtual machine)