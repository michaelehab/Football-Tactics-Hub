export type Endpoint = {
  url: string;
  method: "get" | "post" | "delete";
  auth?: boolean;
};

export enum Endpoints {
  healthz = "healthz",

  signin = "signin",
  signup = "signup",

  createPost = "createPost",
  listPosts = "listPosts",
  getPost = "getPost",
  deletePost = "deletePost",

  createLike = "createLike",
  countLikes = "countLikes",
  deleteLike = "deleteLike",

  createComment = "createComment",
  listComments = "listComments",
  deleteComment = "deleteComment",
  countComments = "countComments",
}

export const ENDPOINT_CONFIGS: { [key in Endpoints]: Endpoint } = {
  [Endpoints.healthz]: { method: "get", url: "/api/v1/healthz" },

  [Endpoints.signin]: { method: "post", url: "/api/v1/signin" },
  [Endpoints.signup]: { method: "post", url: "/api/v1/signup" },

  [Endpoints.listPosts]: { method: "get", url: "/api/v1/posts" },
  [Endpoints.getPost]: { method: "get", url: "/api/v1/posts/:id" },
  [Endpoints.createPost]: { method: "post", url: "/api/v1/posts", auth: true },
  [Endpoints.deletePost]: {
    method: "delete",
    url: "/api/v1/posts/:id",
    auth: true,
  },

  [Endpoints.countLikes]: { method: "get", url: "/api/v1/likes/:postId" },
  [Endpoints.createLike]: {
    method: "post",
    url: "/api/v1/likes/:postId",
    auth: true,
  },
  [Endpoints.deleteLike]: {
    method: "delete",
    url: "/api/v1/likes/:postId",
    auth: true,
  },

  [Endpoints.countComments]: {
    method: "get",
    url: "/api/v1/comments/:postId/count",
  },
  [Endpoints.listComments]: { method: "get", url: "/api/v1/comments/:postId" },
  [Endpoints.createComment]: {
    method: "post",
    url: "/api/v1/comments/:postId",
    auth: true,
  },
  [Endpoints.deleteComment]: {
    method: "delete",
    url: "/api/v1/comments/:commentId",
    auth: true,
  },
};
