# QUESTIONER FOR ANDELA BOOTCAMP

[![Build Status](https://travis-ci.org/chikeozulumba/questioner-andela-bootcamp.svg?branch=develop)](https://travis-ci.org/chikeozulumba/questioner-andela-bootcamp)
[![Coverage Status](https://coveralls.io/repos/github/chikeozulumba/questioner-andela-bootcamp/badge.svg)](https://coveralls.io/github/chikeozulumba/questioner-andela-bootcamp)
[![Maintainability](https://api.codeclimate.com/v1/badges/7a0f20a88e16e73f1bc5/maintainability)](https://codeclimate.com/github/chikeozulumba/questioner-andela-bootcamp/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7a0f20a88e16e73f1bc5/test_coverage)](https://codeclimate.com/github/chikeozulumba/questioner-andela-bootcamp/test_coverage)

## Questioner​ helps the meetup organizer prioritize questions to be answered.

### Technology Stack

- NodeJs - Web Server.
- ExpressJs - Server framework.
- Babel - ES6 Javascript compiler.
- Eslint - Javascript code and syntax linter (Airbnb style guide was adhered).

### Testing tools

- Mocha - Javascript Test Framework.
- Chai - Javascript Assertion Library.
- Istanbul - Javascript code instrumenter.
- NYC - Istanbul's command line interface.
- Postman - Testing API endpoints.

### Features

- user can create a new meetup
- user can create a new question
- users can get all meetups
- users can get a retrieve a specific meetup by ID
- users can update or downvote a meetup
- users can rsvp for a meetup

### Management

Project is managed [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2232678).

### Front End Pages

Front End Pages were hosted using Github pages 👉 [https://chikeozulumba.github.io/questioner-andela-bootcamp/UI](https://chikeozulumba.github.io/questioner-andela-bootcamp/UI)

### API Deployment

API endpoints was hosted using [Heroku](https://heroku.com) 👉 [https://questioner-andela.herokuapp.com/api/v1/](https://questioner-andela.herokuapp.com/api/v1/)

### Api Endpoints

- Get All Meetups - `GET /api/v1/meetups`
- Get Specific Meetup - `GET /api/v1/meetups/:id`
- Create New Meetup - `POST /api/v1/meetups`
- RSVP for a Meetup - `GET /api/v1/meetups/:id/rsvp`
- Create New Question - `POST /api/v1/questions`
- Upvote a question - `PATCH /api/v1/questions/:id/upvote`
- Downvote a question - `PATCH /api/v1/questions/:id/downvote`

### Authors

[Chike Ozulumba](https://twitter.com/chikeozulumba)
