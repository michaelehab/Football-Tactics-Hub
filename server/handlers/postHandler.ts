import { RequestHandler } from "express";
import { db } from '../datastore';
import { Post } from "../types";

const crypto = require('crypto');

export type ExpressHandler<Req, Res> = RequestHandler<string, Partial<Res>, Partial<Req>, any>;


interface listPostRequest{}
interface listPostResponse{
    posts: Post[]
}
export const listPostsHandler: ExpressHandler<listPostRequest, listPostResponse> = (req, res) => {
    return res.send({posts: db.listPosts()});
}

type createPostRequest = Pick<Post, 'title'|'url'|'userId'>;
interface createPostResponse{}
export const createPostHandler: ExpressHandler<createPostRequest, createPostResponse> = (req, res) => {
    if(!req.body.title || !req.body.url || !req.body.userId){
        return res.sendStatus(400);
    }
    const post: Post = {
        id: crypto.randomBytes(20).toString('hex'),
        title: req.body.title,
        url: req.body.url,
        userId: req.body.userId,
        postedAt: Date.now()
    }
    db.createPost(post);
    res.sendStatus(200);
}