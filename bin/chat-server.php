<?php
use Ratchet\server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use MyApp\Chat;

require dirname(__DIR__) . '/websocket/vendor/autoload.php';

$server = IoServer::factory(
    new HttpServer (
        new WsServer(
            new Chat()
        )
    ),
    8080
);

$server->run();