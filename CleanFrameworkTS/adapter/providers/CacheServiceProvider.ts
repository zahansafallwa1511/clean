import { ICoreProvider } from '../../port/ICoreProvider';
import { RedisCacheAdapter } from '../RedisCacheAdapter';
import { HashMapCacheAdapter } from '../HashMapCacheAdapter';

export class CacheServiceProvider {
    register(core: ICoreProvider): void {
        const driver = process.env.CACHE_DRIVER || 'hashmap';

        const cache = driver === 'redis'
            ? new RedisCacheAdapter()
            : new HashMapCacheAdapter();

        core.register('cache', cache);
    }
}
