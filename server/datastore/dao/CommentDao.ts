import { Comment } from '@footballtacticshub/shared';

export interface CommentDao {
  createComment(comment: Comment): Promise<void>;
  getCommentById(id: string): Promise<Comment | undefined>;
  countComments(postId: string): Promise<number>;
  listComments(postId: string): Promise<Comment[]>;
  deleteComment(id: string): Promise<void>;
}
