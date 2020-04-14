<template>
  <header id="header-app" class="shadow">
    <div class="container">
      <div class="row">
        <div class="col-3 col-md-6">
          <strong>
              <div class="logo">
                <router-link to="/home">
                  <span id="mkt-text">Mkt</span>
                  <span id="place-text">Place</span>
                </router-link>
              </div>
          </strong>
        </div>
        <div id="col-cart" class="col-9 col-md-6">
          <router-link
            to="/cart"
          >
            <div class="clickable-area">
              <span id="products-cart-text">
                Produtos
              </span>
              <img id="cart-icon" src="../assets/icons/shopping-cart.svg" />
              <div id="circle-with-number">
                {{ qtdItensCarrinho }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </header>

</template>

<script>
export default {
  data: function () {
    return {
      qtdItensCarrinho: 0
    }
  },
  methods: {
  },
  mounted () {
    // Escuta eventos de outros componentes
    // Adiciona nova quantidade no carrinho
    this.$root.$on('ADDED_ITEM_CART', (qtdAdicionada) => {
      this.qtdItensCarrinho = this.qtdItensCarrinho + parseInt(qtdAdicionada)
    })
    // Remove quantidade no carrinho
    this.$root.$on('REMOVED_ITEM_CART', (qtdRemovida) => {
      this.qtdItensCarrinho = this.qtdItensCarrinho - parseInt(qtdRemovida)
    })
    // Mostra no template quando houver quantidade no localstorage
    if (localStorage.qt_cart) {
      this.qtdItensCarrinho = Number(localStorage.qt_cart)
    }
  },
  watch: {
    qtdItensCarrinho (newQtd) {
      // Se houver modificações na variável, incrementa no localStorage
      localStorage.qt_cart = newQtd
    }
  }
}
</script>

<style lang="scss">

  // Cores
  $gray-color: #909090;
  $violet-color: #8e36b7;

  // Importação das fontes
  @font-face {
    font-family: 'SourceSansPro Regular';
    src: url('../assets/fonts/SourceSansPro-Regular.ttf') format('truetype');
  }

  @font-face {
    font-family: 'SourceSansPro Bold';
    src: url('../assets/fonts/SourceSansPro-Bold.ttf') format('truetype');
  }

  .shadow {
    -webkit-box-shadow: 0 0.3rem 1rem rgba(57, 63, 72, 0.137);
    -moz-box-shadow: 0 0.3rem 1rem rgba(57, 63, 72, 0.137);
    box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.12)
  }

  #mkt-text{
    color: $gray-color
  }

  #place-text{
    color: $violet-color
  }

  #header-app{
    padding: 25px;
    position: sticky;
    width: 100%;
    top: 0;
    background-color: white;
    z-index: 1;
  }

  .logo{
    width: 24px;
    cursor: pointer;
    font-size: 24px;
    font-family: "SourceSansPro Regular";
  }

  #col-cart{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .clickable-area {
    cursor: pointer;
    display: flex;
  }

  #products-cart-text{
    color: $gray-color;
    font-size: 16px;
    font-family: 'SourceSansPro Bold'
  }

  #cart-icon{
    width: 32px;
    height: 32px;
    margin-left: 20px;
    filter: invert(25%) sepia(91%) saturate(1446%) hue-rotate(260deg) brightness(91%) contrast(96%);
  }

  #circle-with-number{
    width: 15px;
    height: 15px;
    line-height: 15px;
    border-radius: 50%;
    text-align: center;
    font-size: 10px;
    background-color: red;
    color: white;
    display: inline-block;
    align-self: flex-end;
    font-family: "SourceSansPro Bold";
  }

  a:hover {
    text-decoration: none;
  }

</style>
