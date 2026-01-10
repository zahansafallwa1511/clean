<?php

namespace Hexagonal\Port;

interface ICoreProvider
{
    public function get(string $name): mixed;
}
