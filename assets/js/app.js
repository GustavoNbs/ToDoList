window.onload = function() {
    carregaLista()
}

function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value.trim()

    if (novaTarefa !== '') {
        criaNovoItemDaLista(novaTarefa)
        salvaLista()
    } else {
        alert('Por favor, insira um texto para a tarefa.')
    }
}

function criaNovoItemDaLista(textoDaTarefa) {
    const listaTarefas = document.getElementById('lista_de_tarefas')

    const novoItem = document.createElement('li')
    
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
    salvaLista()
}

function criaBotaoEditarTarefa(idTarefa) {
    const botaoEditar = document.createElement('button')
    botaoEditar.innerText = 'Editar'
    botaoEditar.setAttribute('onclick', `editarTarefa('${idTarefa}')`)
    return botaoEditar
}

function criaBotaoApagarTarefa(idTarefa) {
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('onclick', `apagarTarefa('${idTarefa}')`)
    return botaoApagar
}

function editarTarefa(idTarefa) {
    const textoAtual = document.getElementById(idTarefa).firstChild
    const inputEdicao = document.createElement('input')
    inputEdicao.type = 'text'
    inputEdicao.value = textoAtual.textContent
    inputEdicao.addEventListener('keyup', function(enter) {
        if (enter.key === 'Enter') {
            textoAtual.textContent = this.value
            this.parentNode.replaceChild(textoAtual, this)
            salvaLista()
        }
    })
    textoAtual.parentNode.replaceChild(inputEdicao, textoAtual)
}

function apagarTarefa(idTarefa) {
    const confirmacao = confirm('Tem certeza que deseja apagar esta tarefa?')
    if (confirmacao) {
        const apagaTexto = document.getElementById(idTarefa).parentNode
        apagaTexto.removeChild(document.getElementById(idTarefa))
        salvaLista()
    }
}

function ocultarTarefasMarcadas() {
    const tarefasMarcadas = document.querySelectorAll('li[style*="line-through"]')
    tarefasMarcadas.forEach(function(tarefa) {
        tarefa.style.display = 'none'
    })
    salvaLista()
}

function mostrarTarefasMarcadas() {
    const tarefasMarcadas = document.querySelectorAll('li[style*="line-through"]')
    tarefasMarcadas.forEach(function(tarefa) {
        tarefa.style.display = 'list-item'
    })
    salvaLista()
}

function apagarLista() {
    const confirmacao = confirm('Tem certeza que deseja apagar toda a lista?')
    if (confirmacao) {
        const listaTarefas = document.getElementById('lista_de_tarefas')
        listaTarefas.innerHTML = ''
        salvaLista()
    }
}

function salvaLista() {
    const listaTarefas = document.getElementById('lista_de_tarefas').innerHTML
    localStorage.setItem('tarefas', listaTarefas)
}

function carregaLista() {
    const listaSalva = localStorage.getItem('tarefas')
    if (listaSalva) {
        document.getElementById('lista_de_tarefas').innerHTML = listaSalva
    }
}