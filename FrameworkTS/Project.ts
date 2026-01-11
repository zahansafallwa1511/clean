import { UserUseCase } from './core/UserUseCase';
import { HashMapCacheAdapter } from './adapter/outbound/HashMapCacheAdapter';
import { HttpServer } from './adapter/inbound/HttpServer';
import { UserHttpAdapter } from './adapter/inbound/UserHttpAdapter';

export class Project {
    run(): void {
        // Outbound adapter
        const cache = new HashMapCacheAdapter();

        // Core
        const userUseCase = new UserUseCase(cache);

        // Inbound adapter
        const userAdapter = new UserHttpAdapter(userUseCase);

        // Server with routes
        const server = new HttpServer();
        server.get('/users/:id', (req, res) => userAdapter.getUser(req, res));
        server.post('/users', (req, res) => userAdapter.createUser(req, res));
        server.listen(3000, () => console.log('Server running on http://localhost:3000'));
    }
}
