import { ICachePort } from '../../port/outbound/ICachePort';

export class HashMapCacheAdapter implements ICachePort {
    private cache: Map<string, unknown> = new Map();

    get(key: string): unknown {
        return this.cache.get(key) ?? null;
    }

    set(key: string, value: unknown): void {
        this.cache.set(key, value);
    }
}
