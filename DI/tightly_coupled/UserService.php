<?php

namespace TightlyCoupled;

class UserService
{
    private HashMapCache $cache;

    public function __construct()
    {
        $this->cache = new HashMapCache();
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
