# REACT-NODEJS-MYSQL-DOCKER PROJECT

### Author: Sean Madondo

## Installation and Setup

- Please git clone project from https://github.com/seanmadondo/my-react-node-docker-project.git
- run `docker compose up`
  - This assumes you have docker installed on your machine.
  - You should now have the UI running at http://localhost:3000 and the server running at http://localhost:8000
  - You should now have a MySQL database running at localhost:3306
    - The username is `sampleuser`
    - The password is `samplepassword`
  - You should bow have PHPMyAdmin running at http://localhost:8080
    - The username is `sampleuser`
    - The password is `samplepassword`
    - PLEASE NOTE: I faced a local issue with docker not populating the tables with data, please copy and paste the sql INSERT queries here to populate the tables: http://localhost:8080/index.php?route=/database/multi-table-query&db=sampledb (...link will work if you have docker running)

## My solution documentation

I have started this project from scratch, but I have utilised a similar tech stack to the one defined in the assessment brief.

### DATABASE

- I am using MYSQL for my database service. The default port is 3306 for communication.
- PHPMYADMIN - browsing databases and manually editing them if required. To function correctly, it relies on the MySQL service, which must be initiated before PHPMyAdmin

### SERVER - NODEJS

I have used a very basic and simple approach to writing a server. Given the simple nature of the app, the server only listens to 4 endpoints and has minimal logic on the server.
The `MYSQL_HOST_IP` will resolve the mysql service's host and map it to the mysql connection.

- Given more time I would follow a Model View Controller (MVC) approach to defining my endpoints.
- I would also simplify the need of extra endpoints by using more faster and effient sql methods
- Manage error states carefully for easier debugging

### CLIENT - React

I have used React as a framework for completing the frontend UI. I have made minimal use of external libraries to demonstrate fundamental understanding of HTML, CSS & Javascript.
The app successfully meets all the functional requirements.
However given more time I would:

- Decouple code, use rules for separation of concerns.
- I would incorporate test-coverage to examine functionality in the codebase.
- Manage states carefully. This includes loading states, error states while including general ui feedback to the user.
- Incorporate a UI library such and material-ui with emotion/css for a better ui and developer experience.
