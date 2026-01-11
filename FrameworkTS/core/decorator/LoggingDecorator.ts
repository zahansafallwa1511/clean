import { IUserUseCase } from '../../port/inbound/IUserUseCase';
import { User } from '../entity/User';
import { CreateUserDTO } from '../dto/CreateUserDTO';

export class LoggingDecorator implements IUserUseCase {
    constructor(private wrapped: IUserUseCase) {}

    getUser(userId: number): User | null {
        console.log(`[LOG] getUser called with userId: ${userId}`);
        const start = Date.now();

        const result = this.wrapped.getUser(userId);

        const duration = Date.now() - start;
        console.log(`[LOG] getUser returned in ${duration}ms, found: ${result !== null}`);
        return result;
    }

    createUser(dto: CreateUserDTO): User {
        console.log(`[LOG] createUser called with: ${dto.name}, ${dto.email}`);
        const start = Date.now();

        const result = this.wrapped.createUser(dto);

        const duration = Date.now() - start;
        console.log(`[LOG] createUser returned in ${duration}ms, userId: ${result.getId()}`);
        return result;
    }
}
