import {User} from '../types'

export interface UserDao {
    createUser(user: User): void;
    getUserById(id: string): User | undefined;
    getUserByEmail(email: string): User | undefined;
    getUserByUsername(userName: string): User | undefined;
}