<?php

namespace LooselyCoupled;

use LooselyCoupled\PhpRedis\Redis;

class RedisCacheAdapter implements CacheInterface
{
    private Redis $redis;

    public function __construct()
    {
        $this->redis = new Redis();
        $this->redis->connect('127.0.0.1', 6379);
    }

    public function get(string $key): mixed
    {
        return $this->redis->get($key);
    }

    public function set(string $key, mixed $value): void
    {
        $this->redis->set($key, $value);
    }
}
