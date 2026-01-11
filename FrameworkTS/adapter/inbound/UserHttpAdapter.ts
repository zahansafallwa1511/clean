import { IUserUseCase } from '../../port/inbound/IUserUseCase';
import { IRequest, IResponse } from './IServer';
import { CreateUserDTO } from '../../core/dto/CreateUserDTO';

export class UserHttpAdapter {
    constructor(private userUseCase: IUserUseCase) {}

    getUser(req: IRequest, res: IResponse): void {
        const userId = parseInt(req.params.id, 10);
        const user = this.userUseCase.getUser(userId);

        if (user) {
            res.status(200).json(user.toJSON());
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }

    createUser(req: IRequest, res: IResponse): void {
        const body = req.body as { name: string; email: string };

        if (!body.name || !body.email) {
            res.status(400).json({ error: 'Name and email are required' });
            return;
        }

        const dto = new CreateUserDTO(body.name, body.email);
        const user = this.userUseCase.createUser(dto);
        res.status(201).json(user.toJSON());
    }
}
