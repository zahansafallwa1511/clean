import { IRequest } from '../../port/IRequest';
import { IResponse } from '../../port/IResponse';
import { IServer } from '../../port/IServer';
import { GetUserUseCase } from '../../core/usecase/GetUserUseCase';
import { SaveUserUseCase } from '../../core/usecase/SaveUserUseCase';
import { User } from '../../core/entity/User';

export class UserController {
    constructor(
        private getUserUseCase: GetUserUseCase,
        private saveUserUseCase: SaveUserUseCase
    ) {}

    registerRoutes(server: IServer): void {
        server.get('/users/:id', this.getUser.bind(this));
        server.post('/users', this.createUser.bind(this));
    }

    private getUser(req: IRequest, res: IResponse): void {
        const userId = parseInt(req.params.id, 10);
        const user = this.getUserUseCase.execute(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }

    private createUser(req: IRequest, res: IResponse): void {
        const user = req.body as User;
        this.saveUserUseCase.execute(user);
        res.status(201).json(user);
    }
}
