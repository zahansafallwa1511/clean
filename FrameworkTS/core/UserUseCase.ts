import { IUserUseCase } from '../port/inbound/IUserUseCase';
import { ICoreProvider } from '../port/ICoreProvider';
import { ICachePort } from '../port/outbound/ICachePort';
import { User } from './entity/User';
import { CreateUserDTO } from './dto/CreateUserDTO';

export class UserUseCase implements IUserUseCase {
    private cache: ICachePort;

    constructor(provider: ICoreProvider) {
        this.cache = provider.get<ICachePort>('cache');
    }

    getUser(userId: number): User | null {
        const data = this.cache.get(`user:${userId}`) as { id: number; name: string; email: string } | null;
        if (!data) return null;
        return new User(data.id, data.name, data.email);
    }

    createUser(dto: CreateUserDTO): User {
        const user = new User(Date.now(), dto.name, dto.email);
        this.cache.set(`user:${user.getId()}`, user.toJSON());
        return user;
    }
}
