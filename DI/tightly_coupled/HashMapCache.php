<?php

namespace TightlyCoupled;

class HashMapCache
{

    public function get(string $key): mixed
    {
        return "value_from_redis";
    }

    public function set(string $key, mixed $value): void
    {
        // Store the value in Redis;
    }
}
