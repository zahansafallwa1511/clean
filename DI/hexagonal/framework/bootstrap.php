<?php

namespace Hexagonal\Framework;

use Hexagonal\Core\UserService;
use Hexagonal\Adapter\RedisCacheAdapter;
use Hexagonal\Adapter\HashMapCacheAdapter;

$env = getenv('CACHE_DRIVER') ?: 'hashmap';

if ($env === 'redis') {
    $cache = new RedisCacheAdapter();
} else {
    $cache = new HashMapCacheAdapter();
}

$userService = new UserService($cache);
