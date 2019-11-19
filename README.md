# Node JS - JWT with role based authorization

This project is a sample of how to use JWT Authentication in Node JS APIs.

Inside the `docker` folder you will find a `docker-compose.yaml` file built to run the MongoDB and the MongoDB Express (a web client for Mongo database). They will be necessary to run and test the project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

In order to run the project, you will need:

- Docker running on your machine
- Node JS installed in your machine
- [MongoDB](https://www.mongodb.com)


### Running the Docker container

Before running the Node JS project, start the Docker containers.

```
docker-compose up -d
```

### Starting the API

Start the Node JS api with the following command from the project's root:

```
npm start
```

## API Routes

### Create User

```
POST /api/users/register
{
    "username": "user",
    "email": "valid@mail.com",
    "password" "the_password"
}
```

### List Users

```
GET /api/users
```

### Assign the User to the "admin" Role

```
POST /api/users/USER_ID/assign-role
{
    "role": "admin"
}
```

### Login (this returns the JWS Token)

```
POST /api/users/login
{
    "email": "valid@mail.com",
    "password" "the_password"
}

RESPONSE
{
    "auth_token": "THE_JWT_TOKEN"
}
```

### Access Authenticated User Information

```
GET /api/users/my-information
HEADERS: {
    "Authorization": "THE_JWT_TOKEN"
}
```


### Access Admin Content

```
GET /api/users/only-admin
HEADERS: {
    "Authorization": "THE_JWT_TOKEN"
}
```

