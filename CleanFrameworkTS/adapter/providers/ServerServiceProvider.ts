import { ICoreProvider } from '../../port/ICoreProvider';
import { HttpServerAdapter } from '../HttpServerAdapter';

export class ServerServiceProvider {
    register(core: ICoreProvider): void {
        const host = process.env.SERVER_HOST || 'localhost';
        const port = parseInt(process.env.SERVER_PORT || '8000', 10);

        const server = new HttpServerAdapter(host, port);
        core.register('server', server);
    }
}
