import { ICoreProvider } from '../../port/ICoreProvider';

export class CoreProvider implements ICoreProvider {
    private static instance: ICoreProvider;
    private services: Map<string, unknown> = new Map();

    constructor() {
        CoreProvider.instance = this;
    }

    static getInstance(): ICoreProvider {
        return CoreProvider.instance;
    }

    register(name: string, service: unknown): void {
        this.services.set(name, service);
    }

    get(name: string): unknown {
        return this.services.get(name);
    }
}
