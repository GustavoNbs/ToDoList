function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value
    criaNovoItemDaLista(novaTarefa)
}

function criaNovoItemDaLista(textoDaTarefa) {
    const listaTarefas = document.getElementById('lista_de_tarefas')
    let qtdTarefas   = listaTarefas.children.length

    const novoItem = document.createElement('li')

    novoItem.innerText = textoDaTarefa
    novoItem.id = `tarefa_id_${qtdTarefas++}`

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))

    novoItem.addEventListener('dblclick', function () {
        editaTexto(this)
    })

    listaTarefas.appendChild(novoItem)
}

function criaInputCheckBoxTarefa(idTarefa) {
    const inputTarefa = document.createElement('input')
    inputTarefa.type = 'checkbox'
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`)
    return inputTarefa
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }    
}

function editaTexto(tarefa) {
    const textoTarefa = tarefa.innerText;
    const inputEdicao = document.createElement('input');
    inputEdicao.type = 'text';
    inputEdicao.value = textoTarefa;

    inputEdicao.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            finalizaEdicaoTarefa(tarefa, inputEdicao);
            salvaTarefasNoLocalStorage();
        }
    });

    tarefa.innerHTML = '';
    tarefa.appendChild(inputEdicao);
    inputEdicao.focus();
}

function finalizaEdicaoTarefa(tarefa, inputEdicao) {
    const novoTexto = inputEdicao.value;
    tarefa.innerHTML = novoTexto;
    tarefa.addEventListener('dblclick', function() {
        editaTarefa(this);
    });
    tarefa.appendChild(criaInputCheckBoxTarefa(tarefa.id));
}


