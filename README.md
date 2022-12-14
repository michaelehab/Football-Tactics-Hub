<div align="center">
  <img src="./web/src/assets/logo/svg/logo-no-background.svg" alt="Football Tactics Hub App Logo" height=250vh margin="auto"/>
</div>

## Description

Web app for sharing and discussing football tactics related posts.

## Getting Started

### Installing Dependencies
Navigate to the `/server` directory and run:

```bash
npm i
```
then navigate to the `/web` directory and run:

```bash
npm i
```
### Creating the .env file
Navigate to the `/server` directory, create the `.env` file and fill the required values, for example:
```
JWT_SECRET="P3pERrHGia"
JWT_EXPIRES_IN="2 days"

PASSWORD_SALT="OtbO0qbCqE"
PASSWORD_ITERATIONS=11
PASSWORD_KEYLEN=12
```
### Running the server

From within the `/server` directory, to run the server, execute:

```bash
PORT=3001 npm start
```

### Starting the web client
From within the `/web` directory, to run the web client, execute:

```bash
npm start
```

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

  - Sample Request : <br>`curl http://localhost:3001/api/v1/signin -X POST -H "Content-Type: application/json" -d '{"login": "michaelehab", "password":"LMfUVfvS(+h(Z#PP}1"}'`

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

  - Sample Request : <br>`curl http://localhost:3001/api/v1/signup -X POST -H "Content-Type: application/json" -d '{"firstName": "Michael", "lastName": "Ehab", "userName": "michaelehab", "email":"michael@email.com", "password":"LMfUVfvS(+h(Z#PP}1"}'`

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
      "content": "I really love this goal",
      "userId": "1a35808fd784b53f26d4e8390fd1ec2b4556acb2",
      "postedAt": 1667581704506
    },
    {
      "id": "f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498",
      "title": "Salah's wonderful goal against Man City!",
      "url": "https://www.youtube.com/watch?v=iZ68OskGqow",
      "content": "Check out this great goal, I love how he thought very quickly before dribbling. He was very smart and the coach helped him so much, tell me what you think about it in the comments.",
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
    "content": "Check out this great goal, I love how he thought very quickly before dribbling. He was very smart and the coach helped him so much, tell me what you think about it in the comments.",
    "userId": "1a35808fd784b53f26d4e8390fd1ec2b4556acb2",
    "postedAt": 1667581754581
  }
}
```

#### POST /api/v1/posts (Requires Auth)

- General:

  - Adds a new post to the database.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/signup -X POST -H "Content-Type: application/json" -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" -d '{"title": "Salah's wonderful goal against Man City!", "url": "https://www.youtube.com/watch?v=iZ68OskGqow"}'`

  - Sample Response :<br>

```json
{
  "post": {
    "id": "f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498",
    "title": "Salah's wonderful goal against Man City!",
    "url": "https://www.youtube.com/watch?v=iZ68OskGqow",
    "content": "Check out this great goal, I love how he thought very quickly before dribbling. He was very smart and the coach helped him so much, tell me what you think about it in the comments.",
    "userId": "1a35808fd784b53f26d4e8390fd1ec2b4556acb2",
    "postedAt": 1667581754581
  }
}
```

#### DELETE /api/v1/posts/:id (Require Auth)

- General:

  - Returns a specific post using the post's id, the user sending this request must be the same user who created the post.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/posts/f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498 -X DELETE -H "Accept: application/json"`

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

#### GET /api/v1/likes/count/:postId

- General:

  - Returns the number of likes on a post using the post's id.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/likes/count/f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498`

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

#### DELETE /api/v1/likes/:postId (Require Auth)

- General:

  - Deletes signedIn user like on the post with postId, the user sending this request must be the same user who added the like.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/likes/f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498 -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" -X DELETE`

  - Sample Response : Status code 200 in case of successful like deletion.

#### GET /api/v1/comments/:postId

- General:

  - Returns all the comments on post using the post's id.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/comments/f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498`

  - Sample Response :<br>

```json
{
  "comments": [
    {
      "id": "3cd7e84f49d9ffe7a55b69becc6e90f06a652b54",
      "userId": "daa2688c36f35962c53e88d54d520c23c18d43e7",
      "postId": "f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498",
      "comment": "What a goal!",
      "postedAt": 1667581754581
    }
  ]
}
```

#### GET /api/v1/comments/count/:postId

- General:

  - Returns the number of comments on a post using the post's id.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/comments/count/f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498`

  - Sample Response :<br>

```json
{
  "comments": 15
}
```

#### POST /api/v1/comments/:postId (Require Auth)

- General:

  - Adds a new comment from the signedIn user on the post with postId.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/comments/f9da75482aa33fd6a2230cc9ff9cc9b8b9a56498 -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" -X POST -d '{"comment": "What a goal!"}'`

  - Sample Response : Status code 200 in case of successful comment insertion.

#### DELETE /api/v1/comments/:id (Require Auth)

- General:

  - Deletes signedIn user comment using comment's id, the user sending this request must be the same user who added the comment.

  - Sample Request : <br>`curl http://localhost:3001/api/v1/comments/3cd7e84f49d9ffe7a55b69becc6e90f06a652b54 -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" -X DELETE`

  - Sample Response : Status code 200 in case of successful comment deletion.

### Client details: (React.js, TypeScript, Chakra UI)
### Screenshots:
![Home Page](https://user-images.githubusercontent.com/29122581/200119231-0164848a-2de5-4cee-89e1-e895e477613c.png)
![User Profile](https://user-images.githubusercontent.com/29122581/200119237-c5b55650-d886-4ac8-945c-d3ce5297b6f1.png)
![Posts Page](https://user-images.githubusercontent.com/29122581/200119245-923b519a-8369-47a1-a31e-418f2376ce8e.png)
![View Post](https://user-images.githubusercontent.com/29122581/200119442-a3117cf5-f41b-4361-be07-819c7aaed7d4.png)
![Not Found Page](https://user-images.githubusercontent.com/29122581/200119622-a6aafca3-170d-4838-b831-139b5989b390.png)
![Navigation Bar](https://user-images.githubusercontent.com/29122581/200119264-9997103d-db5e-42c9-8579-cad73e901bb1.png)

