export interface CacheInterface {
    get(key: string): unknown;
    set(key: string, value: unknown): void;
}
