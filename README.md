# Quadratic Voting App

This is an open-source Quadratic Voting (QV) system with full front-end and back-end implementation. It is designed to be quickly launched with Heroku and can easily be customized.

## Quadratic Voting
Quadratic Voting was first introduced by Steven P. Lalley and E. Glen Weyl as a collective decision-making mechanism. Details of this voting process can be found here.

## Prerequisites 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
This app is built on Python Flask + Angular.
```
Angular 8.3+
Python 3.6+
```
To start the app, you need a `.env` file located in the server folder with the following schema:
```
# Mongo
mongo_url=[your mongodb url]
```

## Build
Run the following command for the first time
```
npm install
python -m venv .venv
pip install -r ./server/requirements.txt
```
To start the server
```
ng build && flask run
```

## Features


## Customizing application


## Further help
Contact both authors for any questions
