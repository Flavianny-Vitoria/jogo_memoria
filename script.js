/* =========================================
   TELAS
========================================= */

const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaVitoria = document.getElementById("tela-vitoria");
const telaGameover = document.getElementById("tela-gameover");
const telaRanking = document.getElementById("tela-ranking");


/* =========================================
   ELEMENTOS
========================================= */

const tabuleiro = document.getElementById("tabuleiro");

const nomeInput = document.getElementById("nome");

const dificuldade = document.getElementById("dificuldade");

const movimentosElemento =
    document.getElementById("movimentos");

const tempoElemento =
    document.getElementById("tempo");

const statusLabel =
    document.getElementById("status-label");

const descricaoSelecionada =
    document.getElementById("descricao-selecionada");


/* =========================================
   MODAL LITERATURA
========================================= */

const modalCuriosidade =
    document.getElementById("modal-curiosidade");

const curiosidadeTitulo =
    document.getElementById("curiosidade-titulo");

const curiosidadeTexto =
    document.getElementById("curiosidade-texto");


/* =========================================
   LIVROS
========================================= */

const livros = [

    {
        id: 1,
        imagem: "img/agua.jpg",
        titulo: "Água Viva",
        autor: "Clarice Lispector",
        curiosidade:
            "Água Viva é uma obra experimental de Clarice Lispector, marcada por uma narrativa mais livre e reflexiva."
    },

    {
        id: 2,
        imagem: "img/cleopatra.jpg",
        titulo: "Cleópatra",
        autor: "Obra literária",
        curiosidade:
            "Cleópatra foi uma das figuras históricas mais conhecidas do Egito Antigo e inspirou diversas obras literárias."
    },

    {
        id: 3,
        imagem: "img/daisy.jpg",
        titulo: "O Grande Gatsby",
        autor: "F. Scott Fitzgerald",
        curiosidade:
            "O Grande Gatsby é um dos romances mais conhecidos da literatura norte-americana do século XX."
    },

    {
        id: 4,
        imagem: "img/diario.jpg",
        titulo: "O Diário",
        autor: "Obra literária",
        curiosidade:
            "Livros em formato de diário são conhecidos por apresentar acontecimentos e pensamentos diretamente pela perspectiva do narrador."
    },

    {
        id: 5,
        imagem: "img/divinos.jpg",
        titulo: "Divinos Rivais",
        autor: "Rebecca Ross",
        curiosidade:
            "Divinos Rivais combina fantasia, romance e comunicação por meio de cartas."
    },

    {
        id: 6,
        imagem: "img/empregada.jpg",
        titulo: "A Empregada",
        autor: "Freida McFadden",
        curiosidade:
            "A Empregada é um thriller psicológico conhecido por suas reviravoltas e por brincar com a percepção do leitor."
    },

    {
        id: 7,
        imagem: "img/evelyn_hugo.jpg",
        titulo: "Os Sete Maridos de Evelyn Hugo",
        autor: "Taylor Jenkins Reid",
        curiosidade:
            "O livro apresenta a história de uma antiga estrela de Hollywood que decide revelar os segredos de sua vida."
    },

    {
        id: 8,
        imagem: "img/jantar_secreto.jpg",
        titulo: "Jantar Secreto",
        autor: "Raphael Montes",
        curiosidade:
            "Jantar Secreto é um thriller brasileiro que mistura suspense, mistério e elementos perturbadores."
    },

    {
        id: 9,
        imagem: "img/laranja.jpg",
        titulo: "Laranja Mecânica",
        autor: "Anthony Burgess",
        curiosidade:
            "Laranja Mecânica é conhecido por sua linguagem própria e por discutir temas como violência, liberdade e controle."
    },

    {
        id: 10,
        imagem: "img/noites.jpg",
        titulo: "Noites Brancas",
        autor: "Fiódor Dostoiévski",
        curiosidade:
            "Noites Brancas é uma novela de Dostoiévski publicada originalmente em 1848."
    },

    {
        id: 11,
        imagem: "img/pequeno_principe.jpg",
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        curiosidade:
            "O Pequeno Príncipe foi publicado em 1943 e se tornou uma das obras mais conhecidas da literatura mundial."
    },

    {
        id: 12,
        imagem: "img/redoma.jpg",
        titulo: "A Redoma de Vidro",
        autor: "Sylvia Plath",
        curiosidade:
            "A Redoma de Vidro foi o único romance publicado por Sylvia Plath e é conhecido por seu caráter autobiográfico."
    }

];


/* =========================================
   VARIÁVEIS DO JOGO
========================================= */

let jogador = "";

let movimentos = 0;

let segundos = 0;

let paresEncontrados = 0;

let bloqueado = false;

let intervalo = null;

let cartasViradas = [];

let modoAtual = "classico";

let tempoRestante = 0;

let tentativasRestantes = 0;


/* =========================================
   NOMES DOS MODOS
========================================= */

const nomesModos = {

    classico: "🎮 Clássico",

    desafio: "⚡ Desafio",

    memoria: "🧠 Memória",

    literatura: "📚 Literatura"

};


/* =========================================
   DESCRIÇÕES DOS MODOS
========================================= */

const descricoesModos = {

    classico:
        "🎮 Modo Clássico: encontre todos os pares no seu próprio ritmo.",

    desafio:
        "⚡ Modo Desafio: encontre todos os pares antes que o tempo acabe!",

    memoria:
        "🧠 Modo Memória: você terá um número limitado de tentativas.",

    literatura:
        "📚 Modo Literatura: encontre os pares e descubra curiosidades sobre os livros."

};


/* =========================================
   MOSTRAR TELA
========================================= */

function mostrarTela(tela) {

    [
        telaInicial,
        telaJogo,
        telaVitoria,
        telaGameover,
        telaRanking

    ].forEach(item => {

        item.classList.add("escondido");

    });


    tela.classList.remove("escondido");
}


/* =========================================
   EMBARALHAR
========================================= */

function embaralhar(lista) {

    return [...lista].sort(
        () => Math.random() - 0.5
    );

}


/* =========================================
   FORMATAR TEMPO
========================================= */

function formatarTempo(valor) {

    const minutos =
        Math.floor(valor / 60);

    const segundos =
        valor % 60;


    return (
        String(minutos).padStart(2, "0") +
        ":" +
        String(segundos).padStart(2, "0")
    );

}


/* =========================================
   QUANTIDADE DE PARES
========================================= */

function obterQuantidadePares() {

    return {

        facil: 6,

        medio: 8,

        dificil: 12

    }[dificuldade.value];

}


/* =========================================
   CONFIGURAÇÕES DOS MODOS
========================================= */

function obterTempoDesafio() {

    return {

        facil: 60,

        medio: 90,

        dificil: 120

    }[dificuldade.value];

}


function obterTentativas() {

    return {

        facil: 10,

        medio: 14,

        dificil: 20

    }[dificuldade.value];

}


/* =========================================
   CRIAR TABULEIRO
========================================= */

function criarTabuleiro() {

    const quantidade =
        obterQuantidadePares();


    const selecionados =
        livros.slice(0, quantidade);


    const cartas = embaralhar([

        ...selecionados,

        ...selecionados

    ]);


    tabuleiro.innerHTML = "";


    cartas.forEach(livro => {

        const carta =
            document.createElement("button");


        carta.className = "carta";

        carta.type = "button";

        carta.textContent = "❔";


        carta.dataset.id =
            livro.id;

        carta.dataset.imagem =
            livro.imagem;


        carta.setAttribute(
            "aria-label",
            "Carta fechada"
        );


        carta.addEventListener(
            "click",
            () => virarCarta(carta)
        );


        tabuleiro.appendChild(carta);

    });

}


/* =========================================
   VIRAR CARTA
========================================= */

function virarCarta(carta) {

    if (

        bloqueado ||

        carta.classList.contains("virada") ||

        carta.classList.contains("combinada")

    ) {

        return;

    }


    carta.classList.add("virada");


    const imagem =
        document.createElement("img");


    imagem.src =
        carta.dataset.imagem;


    imagem.alt =
        "Capa de livro";


    carta.replaceChildren(imagem);


    cartasViradas.push(carta);


    if (cartasViradas.length === 2) {

        movimentos++;

        movimentosElemento.textContent =
            movimentos;


        verificarPar();

    }

}


/* =========================================
   VERIFICAR PAR
========================================= */

function verificarPar() {

    const [carta1, carta2] =
        cartasViradas;


    if (
        carta1.dataset.id ===
        carta2.dataset.id
    ) {

        carta1.classList.add("combinada");

        carta2.classList.add("combinada");


        paresEncontrados++;


        const livro =
            livros.find(
                item =>
                    item.id ==
                    carta1.dataset.id
            );


        cartasViradas = [];


        /* Literatura */

        if (modoAtual === "literatura") {

            mostrarCuriosidade(livro);

        }


        const quantidade =
            obterQuantidadePares();


        if (
            paresEncontrados ===
            quantidade
        ) {

            if (modoAtual === "literatura") {

                setTimeout(
                    finalizarJogo,
                    300
                );

            } else {

                finalizarJogo();

            }

        }

    } else {

        /* Modo Memória */

        if (modoAtual === "memoria") {

            tentativasRestantes--;

            atualizarTentativas();


            if (
                tentativasRestantes <= 0
            ) {

                bloqueado = true;

                setTimeout(() => {

                    esconderCartas(
                        carta1,
                        carta2
                    );

                    finalizarGameOver();

                }, 800);

                return;

            }

        }


        bloqueado = true;


        setTimeout(() => {

            esconderCartas(
                carta1,
                carta2
            );


            cartasViradas = [];

            bloqueado = false;

        }, 800);

    }

}


/* =========================================
   ESCONDER CARTAS
========================================= */

function esconderCartas(carta1, carta2) {

    carta1.classList.remove("virada");

    carta2.classList.remove("virada");


    carta1.replaceChildren();

    carta2.replaceChildren();


    carta1.textContent = "❔";

    carta2.textContent = "❔";


    carta1.setAttribute(
        "aria-label",
        "Carta fechada"
    );


    carta2.setAttribute(
        "aria-label",
        "Carta fechada"
    );

}


/* =========================================
   CRONÔMETRO
========================================= */
function iniciarCronometro() {

    clearInterval(intervalo);

    // No modo Memória não existe cronômetro
    if (modoAtual === "memoria") {
        return;
    }

    intervalo = setInterval(() => {

        // MODO DESAFIO
        if (modoAtual === "desafio") {

            tempoRestante--;

            tempoElemento.textContent =
                formatarTempo(tempoRestante);

            if (tempoRestante <= 0) {

                clearInterval(intervalo);

                finalizarGameOver();
            }

            return;
        }

        // MODO CLÁSSICO E LITERATURA
        segundos++;

        tempoElemento.textContent =
            formatarTempo(segundos);

    }, 1000);
}

/* =========================================
   CONFIGURAR CONTADOR
========================================= */

function configurarContador() {

    clearInterval(intervalo);

    // =========================
    // MODO MEMÓRIA
    // =========================

    if (modoAtual === "memoria") {

        tentativasRestantes =
            obterTentativas();

        statusLabel.textContent =
            "Tentativas";

        tempoElemento.textContent =
            tentativasRestantes;

        // NÃO inicia cronômetro
        return;
    }


    // =========================
    // MODO DESAFIO
    // =========================

    if (modoAtual === "desafio") {

        tempoRestante =
            obterTempoDesafio();

        tempoElemento.textContent =
            formatarTempo(tempoRestante);

        statusLabel.textContent =
            "Tempo restante";

        iniciarCronometro();

        return;
    }


    // =========================
    // CLÁSSICO / LITERATURA
    // =========================

    segundos = 0;

    tempoElemento.textContent =
        "00:00";

    statusLabel.textContent =
        "Tempo";

    iniciarCronometro();
}

/* =========================================
   TENTATIVAS
========================================= */

function atualizarTentativas() {

    if (modoAtual === "memoria") {

        statusLabel.textContent =
            "Tentativas";


        tempoElemento.textContent =
            tentativasRestantes;

    }

}


/* =========================================
   MODAL LITERATURA
========================================= */

function mostrarCuriosidade(livro) {

    if (!livro) {
        return;
    }


    curiosidadeTitulo.textContent =
        `${livro.titulo} — ${livro.autor}`;


    curiosidadeTexto.textContent =
        livro.curiosidade;


    modalCuriosidade.classList.remove(
        "escondido"
    );

}


/* =========================================
   FECHAR MODAL
========================================= */

function fecharCuriosidade() {

    modalCuriosidade.classList.add(
        "escondido"
    );


    /* Se terminou o jogo */

    if (
        paresEncontrados ===
        obterQuantidadePares()
    ) {

        finalizarJogo();

    }

}


/* =========================================
   SALVAR RESULTADO
========================================= */

function salvarResultado() {

    const ranking = JSON.parse(

        localStorage.getItem(
            "cineMemoryRanking"
        ) || "[]"

    );


    ranking.push({

        nome: jogador,

        movimentos: movimentos,

        tempo: segundos,

        dificuldade:
            dificuldade.value,

        modo: modoAtual

    });


    ranking.sort((a, b) => {

        return (
            a.movimentos -
            b.movimentos
        ) ||

        (
            a.tempo -
            b.tempo
        );

    });


    localStorage.setItem(

        "cineMemoryRanking",

        JSON.stringify(
            ranking.slice(0, 10)
        )

    );

}


/* =========================================
   FINALIZAR VITÓRIA
========================================= */

function finalizarJogo() {

    clearInterval(intervalo);


    document.getElementById(
        "resultado-nome"
    ).textContent = jogador;


    document.getElementById(
        "resultado-modo"
    ).textContent =
        nomesModos[modoAtual];


    document.getElementById(
        "resultado-movimentos"
    ).textContent =
        movimentos;


    document.getElementById(
        "resultado-tempo"
    ).textContent =
        formatarTempo(segundos);


    salvarResultado();


    mostrarTela(telaVitoria);

}


/* =========================================
   GAME OVER
========================================= */

function finalizarGameOver() {

    clearInterval(intervalo);

    bloqueado = true;


    document.getElementById(
        "gameover-nome"
    ).textContent = jogador;


    document.getElementById(
        "gameover-pares"
    ).textContent =
        `${paresEncontrados} de ${obterQuantidadePares()}`;


    document.getElementById(
        "gameover-movimentos"
    ).textContent =
        movimentos;


    if (modoAtual === "desafio") {

        document.getElementById(
            "mensagem-gameover"
        ).textContent =
            "⏰ O tempo acabou! Tente novamente.";

    } else {

        document.getElementById(
            "mensagem-gameover"
        ).textContent =
            "🧠 Suas tentativas acabaram! Tente novamente.";

    }


    mostrarTela(telaGameover);

}


/* =========================================
   RANKING
========================================= */

function mostrarRanking() {

    const lista =
        document.getElementById(
            "lista-ranking"
        );


    const ranking = JSON.parse(

        localStorage.getItem(
            "cineMemoryRanking"
        ) || "[]"

    );


    lista.innerHTML = "";


    if (ranking.length === 0) {

        const item =
            document.createElement("li");


        item.textContent =
            "Nenhum resultado registrado ainda.";


        lista.appendChild(item);


    } else {

        ranking.forEach(
            (resultado, indice) => {

                const item =
                    document.createElement("li");


                item.textContent =

                    `${indice + 1}º - ` +

                    `${resultado.nome} | ` +

                    `${nomesModos[
                        resultado.modo
                    ] || "🎮 Clássico"} | ` +

                    `${resultado.movimentos} movimentos | ` +

                    `${formatarTempo(
                        resultado.tempo
                    )} | ` +

                    `${resultado.dificuldade}`;


                lista.appendChild(item);

            }
        );

    }


    mostrarTela(telaRanking);

}


/* =========================================
   SELECIONAR MODO
========================================= */

document
    .querySelectorAll(".modo-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".modo-card"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "selecionado"
                        );

                    });


                card.classList.add(
                    "selecionado"
                );


                modoAtual =
                    card.dataset.modo;


                descricaoSelecionada.textContent =
                    descricoesModos[
                        modoAtual
                    ];

            }
        );

    });


/* =========================================
   INICIAR JOGO
========================================= */

function iniciarJogo() {

    jogador =
        nomeInput.value.trim();


    if (!jogador) {

        alert(
            "Digite seu nome para começar!"
        );


        nomeInput.focus();

        return;

    }


    movimentos = 0;

    segundos = 0;

    paresEncontrados = 0;

    bloqueado = false;

    cartasViradas = [];

    tempoRestante = 0;

    tentativasRestantes = 0;


    movimentosElemento.textContent =
        "0";


    document.getElementById(
        "jogador-atual"
    ).textContent =
        jogador;


    /* Memória */

    if (modoAtual === "memoria") {

        tentativasRestantes =
            obterTentativas();


        statusLabel.textContent =
            "Tentativas";


        tempoElemento.textContent =
            tentativasRestantes;

    }


    /* Outros modos */

    else {

        statusLabel.textContent =
            modoAtual === "desafio"
                ? "Tempo restante"
                : "Tempo";


        tempoElemento.textContent =
            "00:00";

    }


    criarTabuleiro();


    mostrarTela(telaJogo);


    configurarContador();

}


/* =========================================
   REINICIAR
========================================= */

document
    .getElementById("reiniciar")
    .addEventListener(
        "click",
        iniciarJogo
    );


/* =========================================
   COMEÇAR
========================================= */

document
    .getElementById("iniciar")
    .addEventListener(
        "click",
        iniciarJogo
    );


/* =========================================
   JOGAR NOVAMENTE
========================================= */

document
    .getElementById("jogar-novamente")
    .addEventListener(
        "click",
        iniciarJogo
    );


document
    .getElementById("tentar-novamente")
    .addEventListener(
        "click",
        iniciarJogo
    );


/* =========================================
   VOLTAR
========================================= */

document
    .getElementById("voltar")
    .addEventListener(
        "click",
        () => {

            clearInterval(intervalo);

            mostrarTela(telaInicial);

        }
    );


document
    .getElementById("inicio-vitoria")
    .addEventListener(
        "click",
        () => {

            mostrarTela(telaInicial);

        }
    );


document
    .getElementById("inicio-gameover")
    .addEventListener(
        "click",
        () => {

            mostrarTela(telaInicial);

        }
    );


/* =========================================
   RANKING
========================================= */

document
    .getElementById("ver-ranking")
    .addEventListener(
        "click",
        mostrarRanking
    );


document
    .getElementById("voltar-ranking")
    .addEventListener(
        "click",
        () => {

            mostrarTela(telaInicial);

        }
    );


/* =========================================
   LIMPAR RANKING
========================================= */

document
    .getElementById("limpar-ranking")
    .addEventListener(
        "click",
        () => {

            if (
                confirm(
                    "Deseja realmente apagar todo o ranking?"
                )
            ) {

                localStorage.removeItem(
                    "cineMemoryRanking"
                );


                mostrarRanking();

            }

        }
    );


/* =========================================
   CONTINUAR LITERATURA
========================================= */

document
    .getElementById(
        "continuar-literatura"
    )
    .addEventListener(
        "click",
        fecharCuriosidade
    );