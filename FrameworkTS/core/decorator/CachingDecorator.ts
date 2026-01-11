import { IUserUseCase } from '../../port/inbound/IUserUseCase';
import { User } from '../entity/User';
import { CreateUserDTO } from '../dto/CreateUserDTO';

export class CachingDecorator implements IUserUseCase {
    private cache: Map<number, User> = new Map();

    constructor(private wrapped: IUserUseCase) {}

    getUser(userId: number): User | null {
        // Check cache first
        if (this.cache.has(userId)) {
            console.log(`[CACHE] Hit for userId: ${userId}`);
            return this.cache.get(userId)!;
        }

        console.log(`[CACHE] Miss for userId: ${userId}`);
        const result = this.wrapped.getUser(userId);

        // Store in cache if found
        if (result) {
            this.cache.set(userId, result);
        }
        return result;
    }

    createUser(dto: CreateUserDTO): User {
        const result = this.wrapped.createUser(dto);

        // Cache the new user
        this.cache.set(result.getId(), result);
        console.log(`[CACHE] Stored new user: ${result.getId()}`);
        return result;
    }
}
