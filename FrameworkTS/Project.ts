import { CoreProvider } from './adapter/providers/CoreProvider';
import { CacheServiceProvider } from './adapter/providers/CacheServiceProvider';
import { UserUseCase } from './core/UserUseCase';
import { HttpServer } from './adapter/inbound/HttpServer';
import { UserHttpAdapter } from './adapter/inbound/UserHttpAdapter';

export class Project {
    private provider: CoreProvider;

    constructor() {
        this.provider = new CoreProvider();
    }

    private registerProviders(): void {
        const providers = [
            new CacheServiceProvider(),
        ];

        for (const p of providers) {
            p.register(this.provider);
        }
    }

    run(): void {
        this.registerProviders();

        // Core
        const userUseCase = new UserUseCase(this.provider);

        // Inbound adapter
        const userController = new UserHttpAdapter(userUseCase);

        // Server with routes
        const server = new HttpServer();
        server.get('/users/:id', (req, res) => userController.getUser(req, res));
        server.post('/users', (req, res) => userController.createUser(req, res));
        server.listen(3000, () => console.log('Server running on http://localhost:3000'));
    }
}
