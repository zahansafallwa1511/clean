import { IUserUseCase } from '../port/inbound/IUserUseCase';
import { ICachePort } from '../port/outbound/ICachePort';
import { User } from './entity/User';
import { CreateUserDTO } from './dto/CreateUserDTO';

export class UserUseCase implements IUserUseCase {
    constructor(private cache: ICachePort) {}

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
