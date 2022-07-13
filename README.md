# Back-end Documentation

Documantation of back-end instruction how to deploy our project using Docker and start using API

## Docker setup

### Prerequisities

In order to run container you should have docker being installed

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Usage

* First of all, you should clone project

```shell
git clone https://gitlab.com/devloop/anygo/backend/api.git
```

* In order to build containers, enter the next command:
```shell
docker-compose build
```
* In order to run containers, enter the next command:
```shell
docker-compose up
```

When all pulls complete, the docker will run a containers and API wil be listening on `http://localhost/`

## API documention

If you want search specific path of project's API, you can visit `http://localhost/api/` page and see it by mean of Swagger

### Auth module

* Sign up - allows user/driver to save his/her data in database;
* Log in - allows user/driver to check, if he/she is authenticated in system. If true, so user/driver will get an access to app's functionality. We implement this method by using next technologies: JWT, Google and Facebook authentication systems;
* Change password - allows user/driver to reset old password and create a new one;

### User module

* User's profile - allows user to check his credentials;
* Change profile - allows user to change details of the profile;
* User's bonuses - allows user to check the amount of bonuses he possesses;

### Driver module

* Driver's profile - allows driver to check his credentials;
* Driver's documents - allows driver to create a separate row in database for documents;
* Driver's car - allows driver to add/edit his car's details;

### Trip module

* Trip's details - allows user or driver to check information about the trip;
* Driver's profile - allows user to check the details of driver which will pick him/her up;
* User's rate - allows user to rate a driver;

### Merchant module

* Merchant user's profile - allows user to check his credentials;

### Preorder module

* Pre-order trips - allows driver to check if there are any pre-ordered trips for him. Also driver can accept or cancel pre-order;
* Pre-order offers - allows user to check the all offered drivers, and confirm a chosen one;

### Admin module

* Confirm documents - allows admin to confirm the status of driver's documents;
* Driver's information - allows admin to check the information about driver and his documents;
* Send notification - allows admin to send notification to users/drivers or all at once;