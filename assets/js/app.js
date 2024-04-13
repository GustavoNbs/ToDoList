function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value
    criaNovoItemDaLista(novaTarefa)
}

function criaNovoItemDaLista(textoDaTarefa) {
    const listaTarefas = document.getElementById('lista_de_tarefas')
    let qtdTarefas   = listaTarefas.children.length

    const novoItem = document.createElement('li')
    // Cria ID baseado na data e hora
    const idUnico = Date.now()

    novoItem.innerText = textoDaTarefa
    novoItem.id = `tarefa_id_${idUnico}`

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))

    novoItem.appendChild(criaBotaoEditarTarefa(novoItem.id))

    novoItem.appendChild(criaBotaoApagarTarefa(novoItem.id))

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

function criaBotaoEditarTarefa(idTarefa) {
    const botaoEditar = document.createElement('button')
    botaoEditar.innerText = 'Editar'
    botaoEditar.addEventListener('click', function() {
        editaTexto(this.parentNode)

    })
    return botaoEditar
}

function criaBotaoApagarTarefa(idTarefa) {
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    botaoApagar.addEventListener('click', function () {
        const tarefa = document.getElementById(idTarefa)
        tarefa.parentNode.removeChild(tarefa)
    })
    return botaoApagar
}

function editaTexto(tarefa) {
    // Remove os botões da tarefa
    const botoesTarefa = Array.from(tarefa.querySelectorAll('button'))
    botoesTarefa.forEach(botao => {
        botao.remove()
    })

    const textoTarefa = tarefa.innerText
    const inputEdicao = document.createElement('input')
    inputEdicao.type = 'text'
    inputEdicao.value = textoTarefa

    inputEdicao.addEventListener('keyup', function(Enter) {
        if (Enter.key === 'Enter') {
            finalizaEdicaoTarefa(tarefa, inputEdicao)
        }
    })

    // Limpa o conteúdo da tarefa
    tarefa.innerHTML = ''
    tarefa.appendChild(inputEdicao)

    inputEdicao.focus()
}


function finalizaEdicaoTarefa(tarefa, inputEdicao) {
    const novoTexto = inputEdicao.value
    tarefa.innerHTML = novoTexto

    // Adiciona os botoes Devolta
    tarefa.appendChild(criaInputCheckBoxTarefa(tarefa.id))
    tarefa.appendChild(criaBotaoEditarTarefa(tarefa.id))
    tarefa.appendChild(criaBotaoApagarTarefa(tarefa.id))
}

function escondeTarefasMarcadas() {
    const tarefasMarcadas = document.querySelectorAll('li[style="text-decoration: line-through;"]')
    tarefasMarcadas.forEach((tarefa) => {
        tarefa.style.display = 'none'
    })
}

function mostraTarefasMarcadas() {
    const tarefasMarcadas = document.querySelectorAll('li[style="text-decoration: line-through; display: none;"]')
    tarefasMarcadas.forEach((tarefa) => {
        tarefa.style.display = 'block'
    })
}


