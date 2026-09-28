
const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaVitoria = document.getElementById("tela-vitoria");
const telaRanking = document.getElementById("tela-ranking");

const tabuleiro = document.getElementById("tabuleiro");
const nomeInput = document.getElementById("nome");
const dificuldade = document.getElementById("dificuldade");

const movimentosElemento = document.getElementById("movimentos");
const tempoElemento = document.getElementById("tempo");

const livros = [
    { id: 1, imagem: "img/agua.jpg" },
    { id: 2, imagem: "img/cleopatra.jpg" },
    { id: 3, imagem: "img/daisy.jpg" },
    { id: 4, imagem: "img/diario.jpg" },
    { id: 5, imagem: "img/divinos.jpg" },
    { id: 6, imagem: "img/empregada.jpg" },
    { id: 7, imagem: "img/evelyn_hugo.jpg" },
    { id: 8, imagem: "img/jantar_secreto.jpg" },
    { id: 9, imagem: "img/laranja.jpg" },
    { id: 10, imagem: "img/noites.jpg" },
    { id: 11, imagem: "img/pequeno_principe.jpg" },
    { id: 12, imagem: "img/redoma.jpg" }
];

let jogador = "";
let movimentos = 0;
let segundos = 0;
let paresEncontrados = 0;
let primeiraCarta = null;
let bloqueado = false;
let intervalo = null;
let cartasViradas = [];

// Exibe somente a tela solicitada.
function mostrarTela(tela) {
    [telaInicial, telaJogo, telaVitoria, telaRanking]
        .forEach(item => item.classList.add("escondido"));

    tela.classList.remove("escondido");
}

// Embaralha as cartas.
function embaralhar(lista) {
    return [...lista].sort(() => Math.random() - 0.5);
}

// Formata o tempo em minutos e segundos.
function formatarTempo(valor) {
    const minutos = Math.floor(valor / 60);
    const segundos = valor % 60;

    return String(minutos).padStart(2, "0") + ":" +
           String(segundos).padStart(2, "0");
}

// Inicia o cronômetro.
function iniciarCronometro() {
    clearInterval(intervalo);

    intervalo = setInterval(() => {
        segundos++;
        tempoElemento.textContent = formatarTempo(segundos);
    }, 1000);
}

// Cria o tabuleiro de acordo com a dificuldade.

function criarTabuleiro() {
    const quantidade = {
        facil: 6,
        medio: 8,
        dificil: 12
    }[dificuldade.value];

    const selecionados = livros.slice(0, quantidade);
    const cartas = embaralhar([
        ...selecionados,
        ...selecionados
    ]);

    tabuleiro.innerHTML = "";

    cartas.forEach((livro) => {
        const carta = document.createElement("button");
        carta.className = "carta";
        carta.type = "button";
        carta.textContent = "❔";
        carta.dataset.id = livro.id;
        carta.dataset.imagem = livro.imagem;
        carta.setAttribute("aria-label", "Carta fechada");

        carta.addEventListener("click", () => virarCarta(carta));

        tabuleiro.appendChild(carta);
    });
}

// Vira a carta e verifica se encontrou um par.

function virarCarta(carta) {
    if (
        bloqueado ||
        carta.classList.contains("virada") ||
        carta.classList.contains("combinada")
    ) {
        return;
    }

    carta.classList.add("virada");

    const imagem = document.createElement("img");
    imagem.src = carta.dataset.imagem;
    imagem.alt = "Capa de livro";
    carta.replaceChildren(imagem);

    cartasViradas.push(carta);

    if (cartasViradas.length === 2) {
        movimentos++;
        movimentosElemento.textContent = movimentos;
        verificarPar();
    }
}

// Verifica se as duas cartas são iguais.

function verificarPar() {
    const [carta1, carta2] = cartasViradas;

    // Verifica se as imagens são iguais
    if (carta1.dataset.id === carta2.dataset.id) {
        carta1.classList.add("combinada");
        carta2.classList.add("combinada");

        paresEncontrados++;
        cartasViradas = [];

        const quantidade = {
            facil: 6,
            medio: 8,
            dificil: 12
        }[dificuldade.value];

        if (paresEncontrados === quantidade) {
            finalizarJogo();
        }
    } else {
        bloqueado = true;

        setTimeout(() => {
            carta1.classList.remove("virada");
            carta2.classList.remove("virada");

            // Esconde as imagens novamente
            carta1.replaceChildren();
            carta2.replaceChildren();

            carta1.textContent = "❔";
            carta2.textContent = "❔";

            carta1.setAttribute("aria-label", "Carta fechada");
            carta2.setAttribute("aria-label", "Carta fechada");

            cartasViradas = [];
            bloqueado = false;
        }, 800);
    }
}

// Salva os resultados no navegador.
function salvarResultado() {
    const ranking = JSON.parse(
        localStorage.getItem("cineMemoryRanking") || "[]"
    );

    ranking.push({
        nome: jogador,
        movimentos,
        tempo: segundos,
        dificuldade: dificuldade.value
    });

    ranking.sort((a, b) =>
        a.movimentos - b.movimentos || a.tempo - b.tempo
    );

    localStorage.setItem(
        "cineMemoryRanking",
        JSON.stringify(ranking.slice(0, 10))
    );
}

// Finaliza o jogo.
function finalizarJogo() {
    clearInterval(intervalo);

    document.getElementById("resultado-nome").textContent = jogador;
    document.getElementById("resultado-movimentos").textContent = movimentos;
    document.getElementById("resultado-tempo").textContent =
        formatarTempo(segundos);

    salvarResultado();
    mostrarTela(telaVitoria);
}

// Exibe o ranking.
function mostrarRanking() {
    const lista = document.getElementById("lista-ranking");
    const ranking = JSON.parse(
        localStorage.getItem("cineMemoryRanking") || "[]"
    );

    lista.innerHTML = "";

    if (ranking.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Nenhum resultado registrado ainda.";
        lista.appendChild(item);
    } else {
        ranking.forEach((resultado, indice) => {
            const item = document.createElement("li");
            item.textContent =
                `${indice + 1}º - ${resultado.nome} | ` +
                `${resultado.movimentos} movimentos | ` +
                `${formatarTempo(resultado.tempo)} | ` +
                `${resultado.dificuldade}`;
            lista.appendChild(item);
        });
    }

    mostrarTela(telaRanking);
}

// Inicia ou reinicia uma partida.
function iniciarJogo() {
    jogador = nomeInput.value.trim();

    if (!jogador) {
        alert("Digite seu nome para começar!");
        nomeInput.focus();
        return;
    }

    movimentos = 0;
    segundos = 0;
    paresEncontrados = 0;
    primeiraCarta = null;
    bloqueado = false;
    cartasViradas = [];

    movimentosElemento.textContent = "0";
    tempoElemento.textContent = "00:00";

    document.getElementById("jogador-atual").textContent = jogador;

    criarTabuleiro();
    mostrarTela(telaJogo);
    iniciarCronometro();
}

// Eventos dos botões.
document.getElementById("iniciar").addEventListener("click", iniciarJogo);

document.getElementById("reiniciar").addEventListener("click", iniciarJogo);

document.getElementById("jogar-novamente").addEventListener(
    "click", iniciarJogo
);

document.getElementById("voltar").addEventListener("click", () => {
    clearInterval(intervalo);
    mostrarTela(telaInicial);
});

document.getElementById("inicio-vitoria").addEventListener("click", () => {
    mostrarTela(telaInicial);
});

document.getElementById("ver-ranking").addEventListener(
    "click", mostrarRanking
);

document.getElementById("voltar-ranking").addEventListener("click", () => {
    mostrarTela(telaInicial);
});

document.getElementById("limpar-ranking").addEventListener("click", () => {
    if (confirm("Deseja realmente apagar todo o ranking?")) {
        localStorage.removeItem("cineMemoryRanking");
        mostrarRanking();
    }
});