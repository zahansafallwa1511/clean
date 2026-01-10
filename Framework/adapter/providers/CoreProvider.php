<?php

namespace Framework\Adapter\Providers;

use Framework\Port\ICoreProvider;

class CoreProvider implements ICoreProvider
{
    private static ICoreProvider $instance;
    private array $services = [];

    public function __construct()
    {
        self::$instance = $this;
    }

    public static function getInstance(): ICoreProvider
    {
        return self::$instance;
    }

    public function register(string $name, mixed $service): void
    {
        $this->services[$name] = $service;
    }

    public function get(string $name): mixed
    {
        return $this->services[$name];
    }
}
