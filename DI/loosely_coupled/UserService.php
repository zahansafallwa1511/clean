<?php

namespace LooselyCoupled;

class UserService
{
    private CacheInterface $cache;

    public function __construct(CacheInterface $cache)
    {
        $this->cache = $cache;
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
