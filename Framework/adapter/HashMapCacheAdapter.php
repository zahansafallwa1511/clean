<?php

namespace Framework\Adapter;

use Framework\Port\CacheInterface;

class HashMapCacheAdapter implements CacheInterface
{
    private array $hashMap = [];

    public function get(string $key): mixed
    {
        return $this->hashMap[$key] ?? null;
    }

    public function set(string $key, mixed $value): void
    {
        $this->hashMap[$key] = $value;
    }
}
