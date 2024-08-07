function login() {

    const us = document.querySelector("#nomeusuario")
    const sh = document.querySelector("#senha")

    if (us.value.trim() == "" || sh.value.trim() == "") {
        return alert("Você deve preencher os campos")
    }


    fetch("http://127.0.0.1:4000/api/v1/users/login", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            nomeusuario: us.value,
            senha: sh.value
        })
    }).then((res) => res.json())
        .then((result) => {
            console.log(result)
        })
        .catch((error) => console.error(`Erro ao tentar acessar a api ${error}`))
}

function cadastrarUsuario() {
    const us = document.querySelector("#txtusuario")
    const sh = document.querySelector("#txtsenha")
    const ft = document.querySelector("#txtfotoperfil")

    if (us.value.trim() == "" || sh.value.trim() == "" || ft.value.trim() == "") {
        return alert("Preencha todos os campos")
    }
    fetch("http://127.0.0.1:4000/api/v1/users/cadastrar", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        },
        body:JSON.stringify({
            nomeusuario: us.value,
            senha: sh.value,
            foto: ft.value
        })
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(result)
        })
        .catch((error) => console.error(`Erro na api ${error}`))
}

function carregarLivros(){
    const conteudo = document.querySelector(".conteudo")
    fetch("http://127.0.0.1:4001/api/v1/livros/detalhes")
    .then((res)=>res.json())
    .then((dados)=>{
        dados.payload.map((rs)=>{
            let card = `<div class="card col-md-3" style="width: 18rem;">
            <img src=${rs.foto1} class="card-img-top tamanho" alt="...">
            <div class="card-body">
            <h3>${rs.nometitulo}</h3>
              <p class="card-text">Autor:${rs.autor} </p>
              <p class="card-text" style="text-decoration:line-through">De R$ ${rs.precoatual} </p>
              <p class="card-text">Por R$ ${rs.precodesconto<1 ? rs.precoatual : rs.precodesconto} </p>
              <a  class="btn btn-outline-primary" href="detalhes.html?idlivro=${rs.idtitulo}">Saiba mais </a>
            </div>
          </div>`

            conteudo.innerHTML += card

        })
    })
    .catch((error)=>console.error(`Erro na API ${error}`))
}
function detalhes(){
    let id_url = window.location.search.split('=')

    
    
    const conteudo = document.querySelector(".conteudo")
    fetch("http://127.0.0.1:4001/api/v1/livros/detalhes/"+id_url[1])
    .then((res)=>res.json())
    .then((dados)=>{
        dados.payload.map((rs)=>{

          document.querySelector("h2").innerHTML = "Detalhes do livro: "+rs.nometitulo

            let card = ` <div class="card mb-3  col-md-10 shadow-lg cor">
            <div class="row g-0">
              <div class="col-md-4">
              <div id="carouselExampleCaptions" class="carousel slide">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="${rs.foto1}" class="d-block w-100" alt="...">
                  <div class="carousel-caption d-none d-md-block">
                  </div>
                </div>
                <div class="carousel-item">
                  <img src="${rs.foto2}" class="d-block w-100" alt="...">
                  <div class="carousel-caption d-none d-md-block">
                  </div>
                </div>
                <div class="carousel-item">
                  <img src="${rs.foto3}" class="d-block w-100" alt="...">
                  <div class="carousel-caption d-none d-md-block">
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon setas" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next " type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon " aria-hidden="true"></span>
                <span class="visually-hidden setas">Next</span>
              </button>
            </div>
            <div class="col-md-2 fotos">
            <img src=${rs.foto1} class="img-fluid rounded-start" alt="...">
            <img src=${rs.foto2} class="img-fluid rounded-start" alt="...">
            <img src=${rs.foto3} class="img-fluid rounded-start" alt="...">
            <img src=${rs.foto4} class="img-fluid rounded-start" alt="...">
            </div>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h3 class="card-title">${rs.nometitulo}</h3>
                  <h5 class="card-title">${rs.autor}</h5>
                  <p class="card-text">${rs.sinopse}</p>
                  <p class="card-text precoatual">R$ ${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto }</p>
                  <a class="btn btn-outline-warning carrinho" href=carrinho.html?idlivro=${rs.idtitulo}> <img src=img/cart.png width=25 height=25> Adicionar ao Carrinho </a>
                  </div>
              </div>
            </div>
          </div> `

            conteudo.innerHTML += card

        })
    })
    .catch((error)=>console.error(`Erro na API ${error}`))
}

function buscar(){
  const conteudo = document.querySelector(".conteudo")
  // Limpar todo o conteúdo
  conteudo.innerHTML = ""
  // obtendo o texto escrito na caixa de busca
  let palavra = document.querySelector("input").value

  document.querySelector("h2").innerHTML = `Você pesquisou por: ${palavra}`

  
  fetch("http://127.0.0.1:4001/api/v1/livros/detalhes/titulo/"+palavra)
    .then((res)=>res.json())
    .then((dados)=>{
        dados.payload.map((rs)=>{
            let card = ` <div class="card mb-3  col-md-10 shadow-lg cor">
            <div class="row g-0">
              <div class="col-md-4">
              <div id="carouselExampleCaptions" class="carousel slide">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="${rs.foto1}" class="d-block w-100" alt="...">
                  <div class="carousel-caption d-none d-md-block">
                  </div>
                </div>
                <div class="carousel-item">
                  <img src="${rs.foto2}" class="d-block w-100" alt="...">
                  <div class="carousel-caption d-none d-md-block">
                  </div>
                </div>
                <div class="carousel-item">
                  <img src="${rs.foto3}" class="d-block w-100" alt="...">
                  <div class="carousel-caption d-none d-md-block">
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon setas" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next " type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon " aria-hidden="true"></span>
                <span class="visually-hidden setas">Next</span>
              </button>
            </div>
            <div class="col-md-2 fotos">
            <img src=${rs.foto1} class="img-fluid rounded-start" alt="...">
            <img src=${rs.foto2} class="img-fluid rounded-start" alt="...">
            <img src=${rs.foto3} class="img-fluid rounded-start" alt="...">
            <img src=${rs.foto4} class="img-fluid rounded-start" alt="...">
            </div>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h3 class="card-title">${rs.nometitulo}</h3>
                  <h5 class="card-title">${rs.autor}</h5>
                  <p class="card-text precoatual">R$ ${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto }</p>
                  <a  class="btn btn-outline-secondary borda" href="detalhes.html?idlivro=${rs.idtitulo}">Detalhes</a>
                </div>
              </div>
            </div>
          </div> `

            conteudo.innerHTML += card

        })
    })
    .catch((error)=>console.error(`Erro na API ${error}`))
}