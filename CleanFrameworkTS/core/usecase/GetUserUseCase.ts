import { CacheInterface } from '../../port/CacheInterface';
import { User } from '../entity/User';

export class GetUserUseCase {
    constructor(private cache: CacheInterface) {}

    execute(userId: number): User | null {
        return this.cache.get(`user:${userId}`) as User | null;
    }
}
