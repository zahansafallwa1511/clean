export interface ICachePort {
    get(key: string): unknown;
    set(key: string, value: unknown): void;
}
