    let input = document.getElementById('input-msg');
    var socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener('message', function(e){
        const data = JSON.parse(e.data);
        let name = (data.name) ? data.name : 'Anônimo';

        createDivOtherMsg = document.createElement('div');
        createDivOtherMsg.className = 'item child'
        createDivBaloon = document.createElement('div');
        createDivBaloon.className = 'balon-msg-vis vis';
        createDivNone = document.createElement('div');
        createSpanName = document.createElement('span')
        createSpanName.className = 'user visitante';
        nameUser = document.createTextNode(name)
        createSpanName.appendChild(nameUser);
        createSpanMsg = document.createElement('span')
        createSpanMsg.className = 'msg visitante'
        msgUser = document.createTextNode(data.msg);
        createSpanMsg.appendChild(msgUser);
        createDivNone.appendChild(createSpanName)
        createDivNone.appendChild(createSpanMsg)
        createDivBaloon.appendChild(createDivNone);
        createDivOtherMsg.appendChild(createDivBaloon);
    

        document.querySelector('.content').appendChild(createDivOtherMsg);
    });

    var allowMessage = true;

    //Função para enviar mensagem e anti-flood
    function sendMsg(e) {
        if(allowMessage) {
            if(e.keyCode === 13) {
                const data = {
                    msg: this.value
                };

                if(data.msg.length > 0 && data.msg.length < 100)  {
                    
                    //NodeAPI//
                    createDivMyMsg = document.createElement('div');
                    createDivMyMsg.className = 'item child'
                    createDivBaloon = document.createElement('div');
                    createDivBaloon.className = 'balon-msg eu';
                    createDivNone = document.createElement('div');
                    createSpanName = document.createElement('span')
                    createSpanName.className = 'user';
                    nameUser = document.createTextNode('Você')
                    createSpanName.appendChild(nameUser);
                    createSpanMsg = document.createElement('span')
                    createSpanMsg.className = 'msg visitante'
                    msgUser = document.createTextNode(data.msg);
                    createSpanMsg.appendChild(msgUser);
                    createDivNone.appendChild(createSpanName)
                    createDivNone.appendChild(createSpanMsg)
                    createDivBaloon.appendChild(createDivNone);
                    createDivMyMsg.appendChild(createDivBaloon);

                    document.querySelector('.content').appendChild(createDivMyMsg);
                    
                    socket.send(JSON.stringify(data));
                }

                allowMessage = false;
                this.value = '';


            }
            setTimeout(function(){
                allowMessage=true; 
            },2800)

    }
        
    }

    input.addEventListener('keyup', sendMsg)
