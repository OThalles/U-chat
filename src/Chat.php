<?php
namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) { //Ao abrir a conexão
        $this->clients->attach($conn);
        echo "New Connection: ({$conn->resourceId})";
        $numRecv = count($this->clients);
        $msgOnOpen = json_encode([
            'name' => 'BOT',
            'msg' => 'Atualmente temos '.count($this->clients).' usuários online'
        ]);

        $this->sendMessageToAll($msgOnOpen);
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n",
            $from->resourceId, $msg, $numRecv, $numRecv === 1 ? '':'s');

            foreach($this->clients as $client) {
                if($from !== $client) {
                    $client->send($msg);
                }
            }
    
    }

    private function sendMessageToAll($msg) {
        
        foreach($this->clients as $client) {
                $client->send($msg);
            
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn); //Fecha a conexão, caso alguem tenha fechado o navegador;
        echo "Connection {$conn->resourceId} has disconnected";
    }
    public function onError(ConnectionInterface $conn, \Exception $e){
        echo "Ocorreu um erro: {$e->getMessage()}\n";

        $conn->close(); // Retorna o erro e a conexão é fechada.
    }

}

?>