# Football Tactics Hub
## Description
Web app for sharing and discussing football tactics related posts
## Server details: (Node.js, TypeScript)
<ul>
<li>Node.js app using Express.js</li>
<li>Sqlite3 database</li>
</ul>

### Server endpoints: <a href="./shared/src/endpoints.ts">more details here</a>
#### GET /api/v1/healthz

- General: 
  - Returns status "OK" as long as the server is up and running.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/healthz`

  - Sample Response :<br>

```json
    {
        "status": "OK"
    }
```

#### POST /api/v1/signin

- General: 
  - Validates user data, signs and sends JWT token to the client.
  
  - User can use both his/her email and username to signin.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/signin -X POST -H "Content-Type: application/json" -d '{"login": "michaelehab", "password":"LMfUVfvS(+h(Z#PP}"`

  - Sample Response :<br>

```json
    {
    "user": {
        "id": "daa2688c36f35962c53e88d54d520c23c18d43e7",
        "email": "michael@email.com",
        "firstName": "Michael",
        "lastName": "Ehab",
        "userName": "michaelehab"
    },
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYWEyNjg4YzM2ZjM1OTYyYzUzZTg4ZDU0ZDUyMGMyM2MxOGQ0M2U3IiwiaWF0IjoxNjY3NTg0OTUwLCJleHAiOjE2Njc3NTc3NTB9.iOxOOUf8OuGevVn7W2KmwQ17FiKhddOHTLXyHGKH8d4"
}
```

#### POST /api/v1/signup

- General: 
  - Registers a new user to the database.
  
  - Signs and sends a JWT token to the client.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/signup -X POST -H "Content-Type: application/json" -d '{"firstName": "Michael", "lastName": "Ehab", "userName": "michaelehab", "email":"michael@email.com", "password":"LMfUVfvS(+h(Z#PP}"`

  - Sample Response :<br>

```json
    {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYWEyNjg4YzM2ZjM1OTYyYzUzZTg4ZDU0ZDUyMGMyM2MxOGQ0M2U3IiwiaWF0IjoxNjY3NTg0OTUwLCJleHAiOjE2Njc3NTc3NTB9.iOxOOUf8OuGevVn7W2KmwQ17FiKhddOHTLXyHGKH8d4"
}
```

#### GET /api/v1/user (Requires Auth)

- General: 
  - Returns the currently signed in user.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/user -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}"`

  - Sample Response :<br>

```json
    {
        "user": {
          "id": "daa2688c36f35962c53e88d54d520c23c18d43e7",
          "firstName": "Michael",
          "lastName": "Ehab",
          "userName": "michaelehab",
          "email": "michael@email.com"
          }
    }
```

#### GET /api/v1/user/:id

- General: 
  - Returns a specific user using his/her id.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/user/daa2688c36f35962c53e88d54d520c23c18d43e7`

  - Sample Response :<br>

```json
    {
        "user": {
          "id": "daa2688c36f35962c53e88d54d520c23c18d43e7",
          "firstName": "Michael",
          "lastName": "Ehab",
          "userName": "michaelehab",
          "email": "michael@email.com"
          }
    }
```

#### GET /api/v1/profile/:id

- General: 
  - Returns a specific user's profile (same as user but has some stats and recent posts) using his/her id.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/profile/daa2688c36f35962c53e88d54d520c23c18d43e7`

  - Sample Response :<br>

```json
    {
    "user": {
        "id": "daa2688c36f35962c53e88d54d520c23c18d43e7",
        "firstName": "Michael",
        "lastName": "Ehab",
        "userName": "michaelehab",
        "email": "michael@email.com"
    },
    "recentPosts": [],
    "stats": {
        "numberOfComments": 2,
        "numberOfLikes": 1,
        "numberOfPosts": 0
    }
}
```

### Client details: (React.js, TypeScript)
