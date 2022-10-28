import { RequestHandler, Response } from "express";
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

const checkPostRequiredField = (fieldName : string, value : string | undefined) =>{
    if(!value){
        throw `${fieldName} is required, but missing`;
    }
}

type createPostRequest = Pick<Post, 'title'|'url'|'userId'>;
interface createPostResponse{}
export const createPostHandler: ExpressHandler<createPostRequest, createPostResponse> = (req, res) => {
    if(!req.body.title){
        return res.status(400).send("Title field is required but missing!");
    }

    if(!req.body.url){
        return res.status(400).send("Url field is required but missing!");
    }

    if(!req.body.userId){
        return res.status(400).send("UserID field is required but missing!");
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