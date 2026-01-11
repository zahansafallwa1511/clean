import { CacheInterface } from '../port/CacheInterface';

export class HashMapCacheAdapter implements CacheInterface {
    private hashMap: Map<string, unknown> = new Map();

    get(key: string): unknown {
        return this.hashMap.get(key) ?? null;
    }

    set(key: string, value: unknown): void {
        this.hashMap.set(key, value);
    }
}
