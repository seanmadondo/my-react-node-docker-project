# REACT-NODEJS-MYSQL-DOCKER HiPages PROJECT

### Author: Sean Madondo

## Installation and Setup

- Please git clone project from https://github.com/seanmadondo/my-react-node-docker-project.git
- From the root of the project, run `docker-compose up -d`
- run `docker compose up`
  - This assumes you have docker installed on your machine.
  - You should now have the UI running at http://localhost:3000 and the server running at http://localhost:8000
  - You should now have a MySQL database running at localhost:3306
    - The username is `sampleuser`
    - The password is `samplepassword`
  - You should bow have PHPMyAdmin running at http://localhost:8080
    - The username is `sampleuser`
    - The password is `samplepassword`
    - PLEASE NOTE: Incase docker does not populate the tables with data, please copy and paste the INSERT queries here to run them: http://localhost:8080/index.php?route=/database/multi-table-query&db=sampledb (assumes you have PHPMYADMIN running)

## My solution documentation

### DATABASE

- I am using MYSQL as reccomened by Hipages. MySQL employs the extension fields specified for host, database, user, and password to establish connections for the remaining services. Additionally, it utilizes a root password for security purposes. The default port 3306 is made visible for communication.
- PHPMYADMIN - browsing databases and manually editing them if required. To function correctly, it relies on the MySQL service, which must be initiated before PHPMyAdmin

### SERVER - NODEJS

I have used a very basic and simple approach to writing a server. Given the simple nature of the app, the server only listens to 4 endpoints and has no business logic. The `MYSQL_HOST_IP` will resolve the mysql service's host and map it to the mysql connection.

- Given more time I would follow a Model View Controller (MVC) approach to defining my endpoints
- I would also simplify the need of extra endpoints by using more faster and effient sql methods
- Manage error states carefully for easier debugging

### CLIENT - React

I have used React as a framework for completing the frontend UI. The app successfully meets all the requirements. However given more time I would,

- Follow a component driven approach. This would allow re-usability of more code and easier navigation
- I woudld incorporate react-testing-library for test coverage
- Manage more states carefully. This includes loading states, error states aswell as general feedback to the user.
- Incorporate a UI library such and material-ui and emotion/css for a better developer experience.
