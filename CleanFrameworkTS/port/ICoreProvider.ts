export interface ICoreProvider {
    register(name: string, service: unknown): void;
    get(name: string): unknown;
}
