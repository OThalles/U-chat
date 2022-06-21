function scroller(){
    const NodeList = document.querySelectorAll('.item')
    const ArrayFNL = Array.prototype.slice.call(NodeList) // Transformando em lista
    const BotaoScroller = document.getElementById("scroller");

    /* Mudando href do scroller */
    BotaoScroller.href= "#m="+ ArrayFNL.length

    /* Executando a ação */
    BotaoScroller.click()
}
scroller()


function emojis(){
    const div = document.querySelector('.emojis--tab')
    div.classList.toggle("none")
}



function insertEmoji(emoji){
    emojisListen = {"happy":"😀",
                    "other-happy":"😃",
                    "cry-of-funny":"😂"}

    const inp = document.querySelector("#input-msg")
    inp.value = inp.value + emojisListen[emoji];
}