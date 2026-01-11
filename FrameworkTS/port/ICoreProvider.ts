export interface ICoreProvider {
    register(name: string, service: unknown): void;
    get<T>(name: string): T;
}
