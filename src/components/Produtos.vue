<template>
  <div>
    <carousel></carousel>

    <div id="container-produtos" class="container">
      <div id="div-search" class="row">
        <div class="col-12 col-md-auto">
          <span class="text-search">
            <strong>Encontre seu produto</strong>
          </span>
        </div>
        <div id="grouped-search" class="col-12 col-md-9">
          <input id="input-description" v-model="search" placeholder="Pesquisar...">
          <div v-on:click="buscaProdutos" id="button-search">
            <img id="lupa-icon" src="../assets/icons/magnifying-glass.svg">
          </div>
        </div>
      </div>

      <div id="listagem-produtos" class="row equal-height-md">
        <div v-for="produto in produtos" v-bind:key="produto.id" class="col-12 col-md-4 form-group mycard">
          <div class="row">
            <div class="col-md-12">
              <img class="card-image" :src="produto.picture">
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-card-description">
              <span class="text-section">
                Eletrônicos
              </span>
              <br>
              <span class="card-text-productname">
                {{ produto.name.substring(0,8) }}
              </span>
              <br>
              <span class="card-text-description">
                <h6>{{ produto.name }}</h6>
              </span>
              <span class="card-text-price">
                R$ {{ produto.price }}
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 no-gutters">
              <span class="card-text-addcart" v-on:click="adicionaProdutoCarrinho(produto)">
                ADICIONAR AO CARRINHO
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      search: '',
      slideIndex: 1,
      produtos: [],
      produtosList: []
    }
  },
  methods: {
    buscaProdutos: function () {
      if (this.search) {
        this.produtos = this.produtos.filter(produto => {
          // Procura os produtos que corresponder ao input (palavras minúsculas que coincidirem)
          return produto.name.toLowerCase().includes(this.search.toLowerCase())
        })
      } else {
        // Caso realizar uma busca vazia, retorna todos os elementos
        this.produtos = this.produtosList
      }
    },
    adicionaProdutoCarrinho: function (produto) {
      // Adiciona produto no localstorage
      let produtos = []
      if (localStorage.produtos) {
        produtos = JSON.parse(localStorage.produtos)
      }

      produtos.push(produto)
      localStorage.produtos = JSON.stringify(produtos)
      // Emite para o componente header que foi adicionado um novo produto no carrinho
      this.$root.$emit('ADDED_ITEM_CART', 1)
    }
  },
  mounted () {
    // Busca os produtos
    axios
      .get('http://localhost:3000/produtos')
      .then(response => {
        this.produtos = response.data
        this.produtosList = response.data
      })
  }
}

</script>

<style lang="scss">

  // Cores
  $soft-gray: #e0e0e0;
  $gray-color: #909090;
  $dark-gray: #434343;
  $violet-color: #8e36b7;

  // Importação das fontes
  @font-face {
    font-family: 'SourceSansPro Black';
    src: url('../assets/fonts/SourceSansPro-Black.ttf') format('truetype');
  }

  @font-face {
    font-family: 'SourceSansPro Regular';
    src: url('../assets/fonts/SourceSansPro-Regular.ttf') format('truetype');
  }

  @font-face {
    font-family: 'SourceSansPro Bold';
    src: url('../assets/fonts/SourceSansPro-Bold.ttf') format('truetype');
  }

  #container-produtos {
    padding: 25px;
  }

  #div-search {
    padding: 20px;
    -webkit-box-shadow: 0rem 0rem 2rem rgba(0, 0, 0, 0.12);
    -moz-box-shadow: 0rem 0rem 2rem rgba(0, 0, 0, 0.12);
    box-shadow: 0rem 0rem 2rem rgba(0, 0, 0, 0.12)
  }

  .text-search {
    color: $gray-color
  }

  #input-description {
    margin-left: 30px;
    width: 100%;
  }

  #grouped-search {
    display: flex;
  }

  #button-search {
    cursor: pointer;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    background-color: $violet-color
  }

  #lupa-icon {
    width: 15px;
    height: 15px;
    filter: invert(100%) sepia(100%) saturate(6%) hue-rotate(124deg) brightness(102%) contrast(102%)
  }

  #listagem-produtos {
    justify-content: space-around;
    margin-top: 50px;
    flex: initial!important;
  }

  .col-card-image {
    width: 100%;
    height: 250px;
    background-color: $soft-gray
  }

  .col-card-description {
    padding: 20px;
    border-bottom: 1px solid #aaaaaa;
  }

  .mycard {
    width: 30%;
    box-shadow: 0rem 0rem 2rem rgba(0, 0, 0, 0.12);
    height: 100%;
  }

  .card-image {
    max-width: 100%
  }

  .text-section {
    font-family: 'SourceSansPro Bold';
    color: $violet-color;
    font-size: 14px;
  }

  .card-text-productname {
    font-family: 'SourceSansPro Bold';
    color: $dark-gray;
    font-size: 18px;
  }

  .card-text-description {
    font-family: 'SourceSansPro Regular';
    color: $gray-color;
    font-size: 16px;
  }

  .card-text-price {
    font-family: 'SourceSansPro Bold';
    color: $dark-gray;
    font-size: 22px;
  }

  .card-text-addcart {
    font-family: 'SourceSansPro Bold';
    display: flex;
    padding: 15px;
    justify-content: center;
    text-align: center;
    color: $violet-color;
    font-size: 18px;
    cursor: pointer;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
  }

  .card-text-addcart:hover {
    background-color: $violet-color;
    color: white;
  }

  .no-gutters {
    margin-right: 0;
    margin-left: 0;
    padding-right: 0;
    padding-left: 0;
  }

  @media only screen and (max-width: 768px) {
    #input-description {
      margin-left: 0px;
    }
  }

  @media (min-width: 768px){
    .col-md-4 {
      flex: initial;
    }
  }

</style>
