<?php

namespace Framework;

require_once __DIR__ . '/port/ICoreProvider.php';
require_once __DIR__ . '/port/CacheInterface.php';
require_once __DIR__ . '/adapter/HashMapCacheAdapter.php';
require_once __DIR__ . '/adapter/lib/phpredis/Redis.php';
require_once __DIR__ . '/adapter/RedisCacheAdapter.php';
require_once __DIR__ . '/adapter/providers/CoreProvider.php';
require_once __DIR__ . '/adapter/providers/CacheServiceProvider.php';
require_once __DIR__ . '/core/UserService.php';

$coreProvider = new Adapter\Providers\CoreProvider();

$providers = [
    new Adapter\Providers\CacheServiceProvider(),
];

foreach ($providers as $provider) {
    $provider->register($coreProvider);
}

$userService = new Core\UserService($coreProvider);
$userService->saveUser(1, ['name' => 'John', 'email' => 'john@test.com']);
var_dump($userService->getUser(1));
