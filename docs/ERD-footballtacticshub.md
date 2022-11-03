# ERD: Football Tactics Hub

This document explores the design of football tactics hub, a social experience for sharing and discussing football tactics.

We'll use a basic client/server architecture, where a single server is deployed
on a cloud provider next to a relational database, and serving HTTP traffic from
a public endpoint.

## Storage

We'll use a relational database (schema follows) for fast retrieval of posts and their
comments. A minimal database implementation such as sqlite3 suffices, although
we can potentially switch to something with a little more power such as
PostgreSQL if needed. Data will be stored on the server on a separate, backed up volume for resilience. There will be no replication or sharding of data at
this early stage.

We ruled out storage-as-a-service services such as Firestore and the like in
order to showcase building a standalone backend for educational purposes.

### Schema:

We'll need at least the following entities to implement the service:

**Users**:
| Column | Type |
|--------|------|
| ID | STRING/UUID |
| First/Last name | STRING |
| Password | STRING |
| Email | STRING |
| Username | STRING |

**Posts**:
| Column | Type |
|--------|------|
| ID | STRING/UUID |
| Title | STRING |
| URL | STRING |
| UserId | STRING/UUID |
| PostedAt | Timestamp |

**Likes**:
| Column | Type |
|--------|------|
| UserId | STRING/UUID |
| PostId | STRING |

**Comments**:
| Column | Type |
|---------|------|
| ID | STRING |
| UserId | STRING/UUID |
| PostId | STRING |
| Comment | STRING |
| PostedAt | Timestamp |

## Server

A simple HTTP server is responsible for authentication, serving stored data, and
potentially ingesting and serving analytics data.

- Node.js is selected for implementing the server for speed of development.
- Express.js is the web server framework.
- Sequelize to be used as an ORM.

### Auth

For v1, a simple JWT-based auth mechanism is to be used, with passwords
encrypted and stored in the database.

### API

**Auth**:

```
/signIn  [POST]
/signUp  [POST]
/signOut [POST]
```

**Posts**:

```
/posts/list [GET]
/posts/new  [POST]
/posts/:postId  [GET]
/posts/:postId  [DELETE]
```

**Likes**:

```
/likes/:postId [GET]
/likes/:postId [POST]
/likes/:postId [DELETE]
```

**Comments**:

```
/comments/:postId  [POST]
/comments/:postId [GET]
/comments/:commentId  [DELETE]
/comments/:postId/count [GET]
```

## Clients

For now we'll start with a single web client, possibly adding mobile clients later.

The web client will be implemented in React.js.
See Figma/screenshots for details.
API server will serve a static bundle of the React app.
Uses ReactQuery to talk to the backend.
Uses Chakra UI for building the CSS components.

## Hosting

The web client will be hosted using any free web hosting platform such as firebase or netlify. A domain will be purchased for the site, and configured to point to the web host's server public IP.
We'll deploy the server to a (likely shared) VPS for flexibility. The VM will have HTTP/HTTPS ports open, and we'll start with a manual deployment, to be automated later using Github actions or similar.
