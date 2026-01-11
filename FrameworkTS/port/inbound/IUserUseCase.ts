import { User } from '../../core/entity/User';
import { CreateUserDTO } from '../../core/dto/CreateUserDTO';

export interface IUserUseCase {
    getUser(userId: number): User | null;
    createUser(dto: CreateUserDTO): User;
}
