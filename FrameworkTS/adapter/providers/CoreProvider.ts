import { ICoreProvider } from '../../port/ICoreProvider';

export class CoreProvider implements ICoreProvider {
    private services: Map<string, unknown> = new Map();

    register(name: string, service: unknown): void {
        this.services.set(name, service);
    }

    get<T>(name: string): T {
        const service = this.services.get(name);
        if (!service) {
            throw new Error(`Service '${name}' not found`);
        }
        return service as T;
    }
}
