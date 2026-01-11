import { ICoreProvider } from '../../port/ICoreProvider';
import { HashMapCacheAdapter } from '../outbound/HashMapCacheAdapter';

export class CacheServiceProvider {
    register(provider: ICoreProvider): void {
        const driver = process.env.CACHE_DRIVER || 'hashmap';

        if (driver === 'hashmap') {
            provider.register('cache', new HashMapCacheAdapter());
        }
        // Add more drivers here: redis, memcached, etc.
    }
}
