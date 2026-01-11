import { CoreProvider } from './adapter/providers/CoreProvider';
import { CacheServiceProvider } from './adapter/providers/CacheServiceProvider';
import { ServerServiceProvider } from './adapter/providers/ServerServiceProvider';
import { IServer } from './port/IServer';
import { CacheInterface } from './port/CacheInterface';
import { GetUserUseCase } from './core/usecase/GetUserUseCase';
import { SaveUserUseCase } from './core/usecase/SaveUserUseCase';
import { UserController } from './adapter/controller/UserController';

export class Project {
    private coreProvider: CoreProvider;

    constructor() {
        this.coreProvider = new CoreProvider();
    }

    private registerProviders(): void {
        const providers = [
            new CacheServiceProvider(),
            new ServerServiceProvider(),
        ];

        for (const provider of providers) {
            provider.register(this.coreProvider);
        }
    }

    private registerRoutes(server: IServer): void {
        const cache = this.coreProvider.get('cache') as CacheInterface;

        // Create use cases
        const getUserUseCase = new GetUserUseCase(cache);
        const saveUserUseCase = new SaveUserUseCase(cache);

        // Create controllers and register routes
        const userController = new UserController(getUserUseCase, saveUserUseCase);
        userController.registerRoutes(server);
    }

    run(): void {
        this.registerProviders();

        const server = this.coreProvider.get('server') as IServer;
        this.registerRoutes(server);

        server.start();
    }
}
