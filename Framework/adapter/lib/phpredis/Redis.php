<?php

namespace Framework\Adapter\PhpRedis;

class Redis
{
    public function connect(string $host, int $port): bool
    {
        return true;
    }

    public function get(string $key): mixed
    {
        return null;
    }

    public function set(string $key, mixed $value): bool
    {
        return true;
    }
}
