# Matcha

Tinder-like dating app - a web branch project for [Hive Helsinki](https://www.hive.fi/en/) coding school.

- [Demo](#Live demo on Heroku)
- [Task](#task)
- [Stack](#stack)
- [Functionality](#functionality)
- [Run locally](#run-locally)
- [Improvements](#improvements)
- [Acknowledgements](#acknowledgements)

## [Live demo on Heroku](https://matcha-mysql.herokuapp.com/)
**A few disclaimers:**
- I had to recently refactor parts of the project after my free Google Cloud credits expired. The database for the Heroku build is hosted on a US server, so there is some noticeable delay after user actions. There may still be some bugs in this hosted demo.
- The demo is populated with dummy users generated randomly with [faker.js](https://www.npmjs.com/package/faker), which may result in weird and/or amusing user profiles and repeated use of same profile pictures. It is also worth noting that this npm package is no longer being maintained, and profile pictures might not always load.

<p align="center">
  <img src="https://github.com/pesonkim/matcha/blob/master/pic/Screen%20Shot%202021-10-08%20at%206.53.41%20PM.png">
</p>

## Task

The aim of this project was to build a **Tinder-like web app**, where the users can create their profile, browse through a list of recommended profiles or conduct a search by age, distance, fame rating, commong tags. Users can like, report and block other users and chat with users that liked them back.

**Project constraints:**

- Clientside: HTML, CSS, Javascript
- Relational or graph-oriented database
- Micro-frameworks and UI libraries are allowed
- No ORM, validators, or User Account Manager
- No errors, warnings or notice on both server- and client- sides
- No security breaches (e.g. no SQL, HTML injections, plain passwords in the database)
- Compatible at least with Firefox (>=41) and Chrome (>= 46)
- Responsive design

## Stack

This was the first web project where we were allowed to choose our own language, so I used it as an opportunity to learn something new in addition to just vanilla JavaScript or PHP (which our first project required, without any frameworks).

I started with [Full Stack open 2021](https://fullstackopen.com/en/#course-contents) to learn enough about the technologies listed below that I could implement them in my a project of own project, and continued my learning through working and troubleshooting this project.

Frontend:

- React
- Redux
- Tailwind CSS
- Google Maps API

Backend:

- Node.js
- Express
- MySQL
- JWT
- Socket.io

<p align="center">
  <img src="https://github.com/pesonkim/matcha/blob/master/pic/Screen%20Shot%202021-10-08%20at%206.55.16%20PM.png">
</p>

## Functionality

- **User features:**
  - Step-by-step registration, login, and password reset through email link.
  - User data management, incl. edit profile data, change password and geolocation.
  - View own and other user profiles.
  - View profile visit history, list of connected and blocked profiles.


- **Matching features:**
  - A sortable gallery view with a list of suggestions that match the currently logged-in profile (based on mutual interests, location, age, popularity).
  - Additional range sliders to sort and filter users by common interests, location, fame rating and age.


- **Chat features:**
  - Real-time chat between matched users.


- **Notifications features:**
  - Real-time push notifications when the user receives a like/unlike, message from another user or user's profile is checked.

<p align="center">
  <img src="https://github.com/pesonkim/matcha/blob/master/pic/Screen%20Shot%202021-10-08%20at%206.50.38%20PM.png">
</p>

## Run locally
- **Git clone** repo
- Install [MySQL](https://www.mysql.com/) `brew install mysql` or `apt install mysql-server`
  - If you are not prompted to create a user automatically, you can run
  `mysql_secure_installation` utility after the install is done
- The project utilizes geolocation and requires an API key from [Google Maps](https://cloud.google.com/maps-platform) to be fully functional
  - Default positioning is done with IP address coordinates
  - `Maps JavaScript API` is used for an interactive map that allows users to edit their locations
- Make sure you have valid email credentials you can you use for the email service later on
- Install nodejs and npm `brew install nodejs npm` or `apt install nodejs`
- Make sure MySQL is running `mysql.server start` or `service mysql start`
- Create a file **.env** inside the `server` folder and update with your credentials
```
#db config
DB_HOST='localhost'
DB_USER='your_db_username'
DB_PW='your_db_password'
DB_NAME='matcha'

#server config
PORT=3001
IP='http://localhost'

#jwt secret
JWT_SECRET='your_jwt_secret'

#email config
EMAIL='your_email_username'
EMAIL_PW='your_email_password'
```
- Create a file **.env** inside the `client` folder and update with your credentials
```
REACT_APP_API_KEY='your_google_api_key'
REACT_APP_ENDPOINT='http://localhost:3001'
```
- Run command `npm run init` in the matcha root folder to install all client and server dependencies
- Run command `npm run build` to create a production build of the client code for the server
- Run command `npm run db` to setup the database with fake users
- Run command `npm start` to start the server
- Open application in your favorite browser `http://localhost:3001`
- Client requests are logged in the terminal window that started the server

## Improvements

The assignment was originally intended as a pair project, whereas I worked on it alone and may have had to cut some corners to finish it in time. This repository represents the project in the state where I submitted it for peer grading as finished, but it could still be improved upon

- Improving UI and UX (main gallery view and filters might not be the most mobile-friendly, adding scroll-to-top or -bottom buttons, adding read receipts on direct messages)
- Fixing existing bugs (Google Maps component and some CSS styling on Firefox mobile view)

## Acknowledgements

A shout out to fellow Hivers  [Tatiana](https://github.com/T7Q) and [Diana](https://github.com/DianaMukaliyeva) for this readme template
