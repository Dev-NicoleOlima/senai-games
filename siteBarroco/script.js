// Animação de fade-in das seções
const secaoHome = document.getElementById('home');
const secaoHistoria = document.getElementById('historia');
const secaoGaleria = document.getElementById('galeria');
const secaoArtistas = document.getElementById('artistas');
const secaoJogo = document.getElementById('Jogo');


const sections = [secaoHome, secaoHistoria, secaoGaleria, secaoArtistas];

const aparecerSecao = (secao) => {
    const secaoPosicao = secao.getBoundingClientRect().top;
    const janelaAltura = window.innerHeight;

    if (secaoPosicao < janelaAltura * 0.75) {
        secao.classList.add('aparece');
    }
};

window.addEventListener('scroll', () => {
    sections.forEach(secao => aparecerSecao(secao));
});


// Função para mostrar as imagens de obras barrocas
function mostrarImagens() {
    var imagensContainer = document.getElementById('imagens-obras');
    imagensContainer.classList.toggle('hidden'); // Alterna a visibilidade das imagens
}


// Efeito de clique no botão "Sobre"
const btnSobre = document.querySelector('.btn-interativo'); // Seleciona o botão "Sobre"

btnSobre.addEventListener('click', () => {
    btnSobre.style.transform = 'translateY(5px)'; // Efeito de pressionar o botão
    btnSobre.style.boxShadow = 'none'; // Remove a sombra no clique

    setTimeout(() => {
        btnSobre.style.transform = 'translateY(0)'; // Retorna o botão à posição inicial
        btnSobre.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)'; // Restaura a sombra
    }, 100); // Tempo para reverter o efeito de clique
});


function hideMaps()
{
    
    if (document.getElementById("firstMap").style.visibility == "visible")
        document.getElementById("firstMap").style.visibility = "collapse";

    if (document.getElementById("secondMap").style.visibility == "visible")
        document.getElementById("secondMap").style.visibility = "collapse";

    if (document.getElementById("thirtyMap").style.visibility == "visible")
        document.getElementById("thirtyMap").style.visibility = "collapse";
}

function disableExit(e)
{
    e.stopPropagation()
}

function visibleMap1(e)
{
    e.stopPropagation()
    document.getElementById("firstMap").style.visibility = "visible";
}

function visibleMap2(e)
{
    e.stopPropagation()
    document.getElementById("secondMap").style.visibility = "visible";
}
function visibleMap3(e)
{
    e.stopPropagation()
    document.getElementById("thirtyMap").style.visibility = "visible";
}



//Ta faltando esse elemento ou ele ta sem nome
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário (não recarregar a página)

    // Obtém o valor da pesquisa
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();

    // Verifica se o termo de pesquisa está presente no conteúdo das seções
    const sections = document.querySelectorAll("section");
    let found = false; // Variável para verificar se encontrou o termo

    sections.forEach(function(section) {
        const sectionContent = section.innerText.toLowerCase();

        // Se o conteúdo da seção contiver o termo pesquisado
        if (sectionContent.includes(searchTerm)) {
            // Redireciona para a seção encontrada
            window.location.hash = section.id; // Vai para a seção com o ID correspondente
            found = true; // Marca que encontrou a pesquisa
        }
    });

    // Se o termo não for encontrado, você pode fazer algo aqui, como mostrar uma mensagem de "não encontrado"
    if (!found) {
        alert("Nenhuma correspondência encontrada para: " + searchTerm);
    }



    // Se não encontrar, exibe um alerta
    if (!found) {
        alert("Desculpe, não encontramos resultados para a sua pesquisa.");
    }
});
const artistas = [
    "Caravaggio.jpg", "Caravaggio.jpg",
    "Pedro Pablo Rubens.jpg", "Pedro Pablo Rubens.jpg",
    "José de Ribera.jpg", "José de Ribera.jpg",
    "Artemisia Gentileschi.jpg", "Artemisia Gentileschi.jpg",
    "Gian Lorenzo Bernin.jpg", "Gian Lorenzo Bernin.jpg",
    "Francisco de Zurbarán.jpg", "Francisco de Zurbarán.jpg",
    "Diego de Velázquez.jpg", "Diego de Velázquez.jpg",
    "Rembrandt.jpg", "Rembrandt.jpg",
    

];

let cartasViradas = [];
let cartasCertas = [];
let cartasContainer = document.querySelector('.cartas');
let reiniciarBtn = document.querySelector('.reiniciar');

function criarCartas() {
    // Embaralha as cartas
    let embaralhadas = artistas.sort(() => Math.random() - 0.5);

    // Cria as cartas no DOM
    embaralhadas.forEach(artista => {
        let carta = document.createElement('div');
        carta.classList.add('carta');
        carta.setAttribute('data-imagem', artista);

        let img = document.createElement('img');
        img.src = artista;
        carta.appendChild(img);
        cartasContainer.appendChild(carta);

        carta.addEventListener('click', virarCarta);
    });
}

function virarCarta() {
    if (cartasViradas.length < 2 && !this.classList.contains('virada')) {
        this.classList.add('virada');
        cartasViradas.push(this);

        if (cartasViradas.length === 2) {
            verificarCartas();
        }
    }
}

function verificarCartas() {
    let [carta1, carta2] = cartasViradas;
    if (carta1.getAttribute('data-imagem') === carta2.getAttribute('data-imagem')) {
        cartasCertas.push(carta1, carta2);
        cartasViradas = [];

        if (cartasCertas.length === artistas.length) {
            setTimeout(() => alert('Você ganhou!'), 500);
        }
    } else {
        setTimeout(() => {
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
            cartasViradas = [];
        }, 1000);
    }
}

function reiniciarJogo() {
    cartasViradas = [];
    cartasCertas = [];
    cartasContainer.innerHTML = '';
    criarCartas();
}

reiniciarBtn.addEventListener('click', reiniciarJogo);

// Inicializa o jogo
criarCartas();


