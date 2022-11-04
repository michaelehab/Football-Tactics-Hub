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

  - Sample Request : <br>`curl http://localhost:3001/api/v1/signin -X POST -H "Content-Type: application/json" -d '{"login": "michaelehab", "password":"michael"}'`

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

### Client details: (React.js, TypeScript)
