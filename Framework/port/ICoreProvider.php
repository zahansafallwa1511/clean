<?php

namespace Framework\Port;

interface ICoreProvider
{
    public function register(string $name, mixed $service): void;
    public function get(string $name): mixed;
}
