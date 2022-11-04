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

  - Sample Request : <br>`curl http://localhost:3001/api/v1/signin -X POST -H "Content-Type: application/json" -d '{"login": "michaelehab", "password":"LMfUVfvS(+h(Z#PP}"'`

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

  - Sample Request : <br>`curl http://localhost:3001/api/v1/signup -X POST -H "Content-Type: application/json" -d '{"firstName": "Michael", "lastName": "Ehab", "userName": "michaelehab", "email":"michael@email.com", "password":"LMfUVfvS(+h(Z#PP}"'`

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

#### GET /api/v1/posts

- General: 
  - Returns all the posts from the database (no pagination yet).

  - Sample Request : <br>`curl http://localhost:3001/api/v1/posts`

  - Sample Response :<br>

```json
    {
    "posts": [
        {
            "id": "3cd7e84f49d9ffe7a55b69becc6e90f06a652b54",
            "title": "Check this Arsenal tiki taka goal",
            "url": "https://www.youtube.com/watch?v=qsPYfQyZZZ0",
            "userId": "1a35808fd784b53f26d4e8390fd1ec2b4556acb2",
            "postedAt": 1667581704506
        },
        {
            "id": "f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498",
            "title": "Salah's wonderful goal against Man City!",
            "url": "https://www.youtube.com/watch?v=iZ68OskGqow",
            "userId": "1a35808fd784b53f26d4e8390fd1ec2b4556acb2",
            "postedAt": 1667581754581
        }
    ]
    }
```

#### GET /api/v1/posts/:id

- General: 
  - Returns a specific post using the post's id.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/posts/f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498`

  - Sample Response :<br>

```json
    {
    "post": {
            "id": "f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498",
            "title": "Salah's wonderful goal against Man City!",
            "url": "https://www.youtube.com/watch?v=iZ68OskGqow",
            "userId": "1a35808fd784b53f26d4e8390fd1ec2b4556acb2",
            "postedAt": 1667581754581
        }
    }
```

#### POST /api/v1/posts (Requires Auth)

- General: 
  - Adds a new post to the database.
  
  - Signs and sends a JWT token to the client.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/signup -X POST -H "Content-Type: application/json" -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" -d '{"title": "Salah's wonderful goal against Man City!", "url": "https://www.youtube.com/watch?v=iZ68OskGqow"}'`

  - Sample Response :<br>

```json
    {
    "post": {
            "id": "f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498",
            "title": "Salah's wonderful goal against Man City!",
            "url": "https://www.youtube.com/watch?v=iZ68OskGqow",
            "userId": "1a35808fd784b53f26d4e8390fd1ec2b4556acb2",
            "postedAt": 1667581754581
        }
    }
```

#### DELETE /api/v1/posts/:id

- General: 
  - Returns a specific post using the post's id.
  
  - Sample Request : <br>`curl -X DELETE http://localhost:3001/api/v1/posts/f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498 -H "Accept: application/json"`

  - Sample Response : Status code 200 in case of successful deletion.


#### GET /api/v1/likes/:postId (Require Auth)

- General: 
  - Returns true if the signedIn user has a like on the post using the post's id.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/likes/f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498 -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}"`

  - Sample Response :<br>

```json
    {
        "exists": true
    }
```

#### GET /api/v1/likes/count/:postId (Require Auth)

- General: 
  - Returns the number of likes on a post using the post's id.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/likes/count/f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498 -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}"`

  - Sample Response :<br>

```json
    {
        "likes": 23
    }
```

#### POST /api/v1/likes/:postId (Require Auth)

- General: 
  - Adds a new like from the signedIn user on the post with postId.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/likes/f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498 -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" -X POST`

  - Sample Response : Status code 200 in case of successful like insertion.

### Client details: (React.js, TypeScript)
