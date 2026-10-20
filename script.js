// 1. SELECIONAR os elementos do DOM
const campo = document.getElementById("tarefa");
const botao = document.getElementById("adicionar");
const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

// 2. FUNÇÃO que cria uma nova tarefa
function adicionarTarefa() {
    const texto = campo.value.trim();

    // Validação: não deixa adicionar tarefa vazia
    if (texto === "") {
        mensagem.textContent = "Escreva algo antes de adicionar.";
        campo.focus();
        return;
    }
    mensagem.textContent = "";

    // CRIAR elementos novos
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = texto;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.className = "remover";
    botaoRemover.type = "button";

    // Montar a estrutura
    li.appendChild(span);
    li.appendChild(botaoRemover);
    lista.appendChild(li);

    // Limpar o campo e voltar o foco para ele
    campo.value = "";
    campo.focus();

    atualizarContrador();
}

// 3. FUNÇÃO que atualiza o texto do contador
function atualizarContrador() {
    const total = lista.querySelectorAll("li").length;
    const feitas = lista.querySelectorAll("li.concluida").length;
   
    if (total === 0) {
        contador.textContent = "Nenhuma tarefa ainda.";
    } else {
        contador.textContent = `${feitas} de ${total} concluída(s).`;
    }
}

// 4. EVENTOS

// Clique no botão "Adicionar"
botao.addEventListener("click", adicionarTarefa);

// Apertar Enter no campo também adiciona
campo.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        adicionarTarefa();
    }
});

// Delegação de eventos: um único "ouvinte" na lista
// cuida dos cliques em todas as tarefas, inclusive as criadas depois
lista.addEventListener("click", (evento) => {
    const alvo = evento.target;
    const li = alvo.closest("li");
    if (!li) return;

    if (alvo.classList.contains("remover")) {
        li.remove(); // REMOVER do DOM
    } else if (alvo.tagName === "SPAN") {
        li.classList.toggle("concluida"); // ALTERAR classe CSS
    }
   
atualizarContrador();
});


//TEMA CLARO / ESCURO
const botaoTema = document.getElementById("tema");
const raiz = document.documentElement; // a tag <html>

function aplicarTema(tema) {
   raiz.setAttribute("data-tema", tema);
   botaoTema.textContent = tema === "escuro" ? "tema escuro";
}

// Ao abrir a pagina: usa o tema salvo se não hover, o do sistema 
const temaSalvo = localStorage.getItem("tema");
const sistemaEscuro = window.matchMedia("prefers-colar-scheme:dark)").matches;
aplicarTema(temaSalvo || (sistemaEscuro ? "escuro" : "claro"

//Ao cliclar: inverte o tema e salva a escolha
botaoTema.addEventListener("click", () => {
    const atual = raiz.getAttribute("data-tema");
    const novo = atual === "escuro" ? "claro" : "escuro";
    aplicarTema(novo);
    localStorage.setItem("tema", novo);
});