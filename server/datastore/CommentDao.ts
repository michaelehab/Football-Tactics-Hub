import { Comment } from "../types";

export interface CommentDao {
    createComment(comment: Comment): void;
    countComments(postId: string): number;
    listComments(postId: string): Comment[];
    deleteComment(id: string): void;
}