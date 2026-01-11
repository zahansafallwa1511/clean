import { CoreProvider } from './adapter/providers/CoreProvider';
import { CacheServiceProvider } from './adapter/providers/CacheServiceProvider';
import { UserUseCase } from './core/UserUseCase';
import { HttpServer } from './adapter/inbound/HttpServer';
import { UserHttpAdapter } from './adapter/inbound/UserHttpAdapter';
import { LoggingDecorator } from './core/decorator/LoggingDecorator';
import { CachingDecorator } from './core/decorator/CachingDecorator';
import { AuditDecorator } from './core/decorator/AuditDecorator';
import { IUserUseCase } from './port/inbound/IUserUseCase';

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

        // Core use case
        const baseUseCase = new UserUseCase(this.provider);

        // Wrap with decorators (order matters: outer executes first)
        const withLogging = new LoggingDecorator(baseUseCase);
        const withCaching = new CachingDecorator(withLogging);
        const withAudit = new AuditDecorator(withCaching);

        // Final use case with all decorators
        const userUseCase: IUserUseCase = withAudit;

        // Controller doesn't know about decorators - just uses IUserUseCase
        const userController = new UserHttpAdapter(userUseCase);

        // Server with routes
        const server = new HttpServer();
        server.get('/users/:id', (req, res) => userController.getUser(req, res));
        server.post('/users', (req, res) => userController.createUser(req, res));
        server.listen(3000, () => console.log('Server running on http://localhost:3000'));
    }
}
