import { DataStore } from "..";
import { User, Like, Comment, Post } from "../../types";
export class InMemoryDataStore implements DataStore{
    private users : User[] = [];
    private likes : Like[] = [];
    private comments : Comment[] = [];
    private posts : Post[] = [];

    createUser(user: User): void {
        this.users.push(user);
    }
    getUserById(id: string): User | undefined {
        return this.users.find(u => u.id === id);
    }
    getUserByEmail(email: string): User | undefined {
        return this.users.find(u => u.email === email);
    }
    getUserByUsername(userName: string): User | undefined {
        return this.users.find(u => u.userName === userName);
    }
    createLike(like: Like): void {
        throw new Error("Method not implemented.");
    }
    deleteLike(like: Like): void {
        throw new Error("Method not implemented.");
    }
    getLikes(postId: string): number {
        throw new Error("Method not implemented.");
    }
    exists(like: Like): boolean {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): void {
        throw new Error("Method not implemented.");
    }
    countComments(postId: string): number {
        throw new Error("Method not implemented.");
    }
    listComments(postId: string): Comment[] {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): void {
        throw new Error("Method not implemented.");
    }
    listPosts(): Post[] {
        return this.posts;
    }
    createPost(post: Post): void {
        this.posts.push(post);
    }
    getPost(id: string): Post | undefined {
        return this.posts.find(p => p.id === id);
    }
    getPostByUrl(url: string): Post | undefined {
        return this.posts.find(p => p.url === url);
    }
    deletePost(id: string): void {
        const index = this.comments.findIndex(c => c.id === id);
        if (index === -1) {
            return;
        }
        this.posts.splice(index, 1);
    }
    
}