<?php

namespace Framework;

use Hexagonal\Adapter\RedisCacheAdapter;
use Hexagonal\Adapter\HashMapCacheAdapter;

class CacheServiceProvider
{
    public function register(CoreProvider $core): void
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
