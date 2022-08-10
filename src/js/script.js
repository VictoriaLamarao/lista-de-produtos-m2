let button = document.querySelector(
  "estiloGeralBotoes estiloGeralBotoes--filter"
);
let valor = document.querySelector("span");
let ulCarrinho = document.querySelector(".produtosCarrinho");
let ulP = document.querySelector(".listaProdutos");
let divBotoes = document.querySelector("#botoesContainer");
let button2 = document.querySelector(
  "estiloGeralBotoes estiloGeralBotoes--botaoBuscaPorNome"
);
let div = document.querySelector(".containerBuscaPorNome");
let searchInput = document.querySelector("input");
let sectionVitrine = document.querySelector(".containerVitrine");
let sectionCarrinho = document.querySelector(".carrinho");
let divCar = document.querySelector(".notProdutos");
let arrReceber = [];
//let buttonRemove = document.querySelector(".botao-remover")

// função criar lista de produtos
function criarListas(objeto) {
  let titulo = objeto.nome;
  let secao = objeto.secao;
  let price = objeto.preco;
  let category = objeto.category;
  let id = objeto.id;

  let li = document.createElement("li");
  li.classList.add("vitrine");
  let image = document.createElement("img");
  let h3 = document.createElement("h3");
  let span = document.createElement("p");
  let p = document.createElement("span");
  let button = document.createElement("button");
  button.classList.add("button-comprar");
  button.setAttribute("id", id);
  button.addEventListener("click", addCar);

  image.src = objeto.img;
  h3.innerText = titulo;
  span.innerText = secao;
  button.innerText = "Comprar";
  p.innerText = `R$ ${price}.00`;

  li.append(image, h3, span, criarOlLista2(objeto), p, button);

  return li;
}

function criarOlLista2(objeto) {
  let ol = document.createElement("ol");
  ol.classList.add("classOl")
  let componentes = objeto.componentes;

  componentes.forEach((elemento) => {
    let liS = document.createElement("li");
    liS.innerText = elemento;
    ol.append(liS);
  });

  return ol;
}

//função para gerar as listas na pagina
function gerador(arr) {
  let ul = document.querySelector(".listaProdutos");
  for (let i = 0; i < arr.length; i++) {
    let objeto = arr[i];
    let objeto2 = criarListas(objeto);
    ul.append(objeto2);
  }
}

gerador(produtos);

divBotoes.addEventListener("click", filtroDeProdutos);

//função para filtrar os produtos quando clica nos botões
function filtroDeProdutos(event) {
  ulP.innerHTML = " ";
  let clicar = event.target;
  if (clicar.id == "todosProdutos") {
    gerador(produtos);
    somaProdutos(produtos);
  } else if (clicar.id == "fruta") {
    let todosProdutos = produtos.filter((element) => {
      if (element.categoria == "fruta") {
        return element;
      }
    });
    somaProdutos(todosProdutos);
    gerador(todosProdutos);
  } else if (clicar.id == "laticinios") {
    let panific = produtos.filter((element) => {
      if (element.categoria == "Leite") {
        return element;
      }
    });
    somaProdutos(panific);
    gerador(panific);
  } else if (clicar.id == "panificadora") {
    let doce = produtos.filter((element) => {
      if (element.categoria == "doces") {
        return element;
      }
    });
    somaProdutos(doce);
    gerador(doce);
  }
}

// barra de pesquisa

addEventListener("keyup", pesquisar);

function pesquisar() {
  ulP.innerHTML = " ";
  let newArr = [];
  let texto = searchInput.value.toLowerCase();
  newArr = produtos.filter((x) => {
    if (x.nome.toLowerCase().includes(texto)) {
      return x;
    }
  });

  gerador(newArr);
  somaProdutos(newArr);
}

function somaProdutos(arr) {
  let resultado = 0;
  for (let i = 0; i < arr.length; i++) {
    resultado += arr[i].preco;
  }
  valor.innerText = `R$${resultado}.00`;
}
somaProdutos(produtos);

function criarLiCarrinho(objeto, index) {
  let nomeTitulo = objeto.nome;
  let price = objeto.preco;
  let section = objeto.secao;
  let category = objeto.categoria;
  let id = objeto.id;

  let image = document.createElement("img");
  let div = document.createElement("div");
  let pTitulo = document.createElement("p");
  let pPrice = document.createElement("p");
  let spanSection = document.createElement("span");
  var button2 = document.createElement("button");
  button2.classList.add("botao-remover");
  let li = document.createElement("li");
  li.classList.add("lista-de-produtos");
  button2.addEventListener("click", removeCar);

  image.src = objeto.img;
  pTitulo.innerText = nomeTitulo;
  spanSection.innerText = section;
  pPrice.innerText = `R$ ${price}.00`;
  button2.innerText = "Remover";
  li.setAttribute("id", id);

  div.append(pTitulo, spanSection, pPrice);
  li.append(image, div, button2);

  return li;
}

//geradorCarrinho(produtos);
function geradorCarrinho(arrReceber) {
  //console.log(`você chamou a função gerador carrinho ${arrReceber}`);
  for (let i = 0; i < arrReceber.length; i++) {
    let objeto = arrReceber[i];
    let objeto2 = criarLiCarrinho(objeto);
    ulCarrinho.append(objeto2);
  }

  return ulCarrinho;
}

function addCar(event) {
  
  let elemento = event.target;

  // let verificarPai = elemento.closest("li");
  // let consultarIdPai = verificarPai.id;
  //section.innerHTML = "";
  ulCarrinho.innerHTML = "";
  if (elemento.tagName == "BUTTON") {
    for (let i = 0; i < produtos.length; i++) {
      if (elemento.id == produtos[i].id) {
        arrReceber.push(produtos[i]);
      }
    }
  }

  geradorCarrinho(arrReceber);
}

function removeCar(event) {
  let elemento = event.target;
  let verificar = elemento.closest("li");
  let consultarVerificar = verificar.id;
  ulCarrinho.innerHTML = "";

  if (elemento.tagName == "BUTTON") {
    for (let i = 0; i < arrReceber.length; i++) {
      if (consultarVerificar == arrReceber[i].id) {
        arrReceber.splice(arrReceber.indexOf(arrReceber[i]), 1);
        geradorCarrinho(arrReceber);
      }
    }
  }
}
