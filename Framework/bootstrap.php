<?php

namespace Framework;

require_once __DIR__ . '/../Hexagonal/port/ICoreProvider.php';
require_once __DIR__ . '/../Hexagonal/port/CacheInterface.php';
require_once __DIR__ . '/../Hexagonal/adapter/HashMapCacheAdapter.php';
require_once __DIR__ . '/CoreProvider.php';
require_once __DIR__ . '/CacheServiceProvider.php';
require_once __DIR__ . '/core/UserService.php';

$coreProvider = new CoreProvider();

$providers = [
    new CacheServiceProvider(),
];

foreach ($providers as $provider) {
    $provider->register($coreProvider);
}

$userService = new Core\UserService($coreProvider);
$userService->saveUser(1, ['name' => 'John', 'email' => 'john@test.com']);
var_dump($userService->getUser(1));
