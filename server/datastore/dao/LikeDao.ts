import { Like } from '@footballtacticshub/shared';

export interface LikeDao {
  createLike(like: Like): Promise<void>;
  deleteLike(like: Like): Promise<void>;
  getLikes(postId: string): Promise<number>;
  exists(like: Like): Promise<boolean>;
}
