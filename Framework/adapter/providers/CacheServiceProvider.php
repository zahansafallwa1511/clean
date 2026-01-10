<?php

namespace Framework\Adapter\Providers;

use Framework\Port\ICoreProvider;
use Framework\Adapter\RedisCacheAdapter;
use Framework\Adapter\HashMapCacheAdapter;

class CacheServiceProvider
{
    public function register(ICoreProvider $core): void
    {
        $driver = getenv('CACHE_DRIVER') ?: 'hashmap';

        $cache = match ($driver) {
            'redis' => new RedisCacheAdapter(),
            'hashmap' => new HashMapCacheAdapter(),
            default => new HashMapCacheAdapter(),
        };

        $core->register('cache', $cache);
    }
}
