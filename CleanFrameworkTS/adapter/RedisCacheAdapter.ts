import { CacheInterface } from '../port/CacheInterface';
import { Redis } from './lib/redis/Redis';

export class RedisCacheAdapter implements CacheInterface {
    private redis: Redis;

    constructor() {
        this.redis = new Redis();
        this.redis.connect('127.0.0.1', 6379);
    }

    get(key: string): unknown {
        return this.redis.get(key);
    }

    set(key: string, value: unknown): void {
        this.redis.set(key, value);
    }
}
