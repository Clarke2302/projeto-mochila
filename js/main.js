const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [] //criamos uma array de um objeto para guardar os itens da lista

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => { //na hora de clicar no adicionar eu pego esses dados
    evento.preventDefault(); //prevenindo o evento padrao
    
    const nome = evento.target.elements["nome"];
    const quantidade = evento.target.elements["quantidade"];

    const existe = itens.find(elemento => elemento.nome === nome.value) //esse elemento existe?
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade":quantidade.value
    }

    if(existe){ //se existe atualiza
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)
        
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }else{ //se não foi encontrado crie item id
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id +1 : 0;

        criaElemento (itemAtual);
        
        itens.push(itemAtual)
    }

    
    localStorage.setItem("itens", JSON.stringify(itens)) //transformando em string

    nome.value = ""
    quantidade.value= ""
})
function criaElemento(item){
    //<li class="item"><strong>3</strong>Meia</li> //cada item é uma li
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numItem = document.createElement('strong');
    numItem.innerHTML = item.quantidade;
    numItem.dataset.id = item.id
    novoItem.appendChild(numItem);
    
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem);
    
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML=item.quantidade
}

function botaoDeleta (id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X"
    elementoBotao.addEventListener("click",function () {
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove()
    
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1); //remover item array pelo id
    
    localStorage.setItem("itens", JSON.stringify(itens))
}