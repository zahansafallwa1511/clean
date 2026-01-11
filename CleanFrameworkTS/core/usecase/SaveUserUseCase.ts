import { CacheInterface } from '../../port/CacheInterface';
import { User } from '../entity/User';

export class SaveUserUseCase {
    constructor(private cache: CacheInterface) {}

    execute(user: User): void {
        this.cache.set(`user:${user.id}`, user);
    }
}
