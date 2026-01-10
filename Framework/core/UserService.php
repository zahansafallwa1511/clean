<?php

namespace Framework\Core;

use Hexagonal\Port\ICoreProvider;
use Hexagonal\Port\CacheInterface;

class UserService
{
    private CacheInterface $cache;

    public function __construct(ICoreProvider $provider)
    {
        $this->cache = $provider->get('cache');
    }

    public function getUser(int $userId): ?array
    {
        return $this->cache->get("user:{$userId}");
    }

    public function saveUser(int $userId, array $data): void
    {
        $this->cache->set("user:{$userId}", $data);
    }
}
