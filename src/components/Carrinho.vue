<template>
  <div class="container wrapper">
    <h6
      class="text-sem-produtos"
      v-if="!produtos.length"
    >Você ainda não possui produtos no carrinho.</h6>
    <table v-if="produtos.length" class="responsive-table">
      <tr class="hidden-sm">
        <th class="first-th">PRODUTOS</th>
        <th>QUANTIDADE</th>
        <th>VALOR UNITÁRIO</th>
        <th>TOTAL</th>
      </tr>
      <tr v-for="(produto, index) in produtos" v-bind:key="produto.name">
        <td data-title="PRODUTOS">
          <h5 class="text-section type-product">Eletrônicos</h5>
          <div class="inline-flex">
            <img
              v-on:click="removeProdutoCarrinho(index, produto)"
              class="icon-trash"
              src="../assets/icons/garbage.svg"
            />
            <h6 class="description-product-cart">{{ produto.name }}</h6>
          </div>
        </td>
        <td data-title="QUANTIDADE">
          <div class="div-controller-quantidade">
            <div v-on:click="decrementaQuantidade(index, produto)" class="action-qtd-button-left">
              <strong>-</strong>
            </div>
            <div class="div-input-qtd">
              <input readonly v-model="produto.quantidade" class="input-qtd-cart" type="text" />
            </div>
            <div v-on:click="incrementaQuantidade(index, produto)" class="action-qtd-button-right">
              <strong>+</strong>
            </div>
          </div>
        </td>
        <td data-title="VALOR UNITÁRIO">R${{ produto.price }}</td>
        <td data-title="TOTAL">R${{ getValorTotalProduto(produto) }}</td>
      </tr>
    </table>

    <div v-if="produtos.length" id="row-totais" class="row pt-4 pb-4">
      <div class="col-md-10">
        <span class="text-total">TOTAL À VISTA</span>
      </div>
      <div class="col-md-2">
        <span class="text-total text-money">R${{ totalVista }}</span>
      </div>

      <div class="col-md-10">
        <span class="text-total">TOTAL PARCELADO</span>
      </div>
      <div class="col-md-2">
        <span class="text-total text-parcelado">
          em até
          <strong>10x R${{ getTotalParcelado() }}</strong>
          <br />
          (Total R${{ totalVista }})
        </span>
      </div>
    </div>

    <div v-if="produtos.length" class="row mt-5">
      <div id="col-limpar-carrinho" class="col-md-3">
        <img v-on:click="limpaCarrinho()" class="icon-trash mr-1" src="../assets/icons/garbage.svg" />
        <h6 v-on:click="limpaCarrinho()" class="text-limpa-carrinho">Limpar carrinho</h6>
      </div>

      <div id="col-botoes-cart" class="col-md-9 inline-flex">
        <router-link to="/home">
          <button id="btn-continuar-comprando" class="btn-cart">Continuar comprando</button>
        </router-link>

        <router-link to="/checkout">
          <button id="btn-concluir-compra" class="btn-cart ml-4">Concluir compra</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      produtos: [],
      totalVista: 0
    };
  },
  methods: {
    // Ao iniciar componente, busca os produtos que estão no carrinho
    getProdutosCarrinho: function() {
      if (localStorage.produtos) {
        this.produtos = JSON.parse(localStorage.produtos);
        // Descobre a quantidade de vezes que o mesmo produto foi guardado no localStorage
        for (let i = 0; i < this.produtos.length; i++) {
          this.produtos[i].quantidade = this.getQuantidadesProduto(
            this.produtos,
            this.produtos[i].name
          );
        }
        // Remove os produtos duplicados para mostrar no template apenas um produto de cada, com suas respectivas quantidades
        this.produtos = this.removeProdutosDuplicados(this.produtos, "name");
        // Calcula o total a vista
        this.getTotalVista();
      }
    },
    getQuantidadesProduto(array, nomeProduto) {
      return array.filter(v => v.name === nomeProduto).length;
    },
    removeProdutosDuplicados(produtosArray, prop) {
      var newArray = [];
      var lookupObject = {};
      for (var i = 0; i < produtosArray.length; i++) {
        lookupObject[produtosArray[i][prop]] = produtosArray[i];
      }

      for (i in lookupObject) {
        newArray.push(lookupObject[i]);
      }
      return newArray;
    },
    // Calcula o total parcelado
    getTotalParcelado: function() {
      let valor = this.totalVista.toString();
      valor = valor.replace(".", "");
      valor = valor.replace(",", "");
      valor = parseFloat(valor);
      valor = (valor / 10) * 100;
      return valor.toLocaleString({ minimumFractionDigits: 2 });
    },
    // Calcula o valor total do produto com base na quantidade e preço
    getValorTotalProduto: function(produto) {
      let total = 0;
      let valor = produto.price;
      valor = valor.replace(".", "");
      valor = valor.replace(",", "");
      valor = parseFloat(valor);
      total = total + (valor * produto.quantidade) / 100;
      return total.toLocaleString({ minimumFractionDigits: 2 });
    },
    decrementaQuantidade: function(indexProduto, produto) {
      // Não possui mais quantidades para remover, então não continua a função
      if (this.produtos[indexProduto].quantidade === 0) {
        return;
      }
      // Decrementa quantidade do local storage
      this.decrementaQuantidadeLocalStorage(produto);
      // Decrementa quantidade do objeto
      this.produtos[indexProduto].quantidade--;
      // Emite um evento informando para o componente de header que foi removido 1 elemento do carrinho
      this.$root.$emit("REMOVED_ITEM_CART", 1);
      // Recalcula o valor total a vista e renderiza novamente com as modificações
      this.getTotalVista();
      this.$forceUpdate();
    },
    incrementaQuantidade: function(indexProduto, produto) {
      // Incrementa a quantidade no local storage
      this.incrementaQuantidadeLocalStorage(produto);
      // Incrementa a quantidade no objeto do produto
      this.produtos[indexProduto].quantidade++;
      // Emite um evento informando para o componente header que foi inserido 1 elemento no carrinho
      this.$root.$emit("ADDED_ITEM_CART", 1);
      // Recalcula o total a vista e renderiza novamente com as modificações
      this.getTotalVista();
      this.$forceUpdate();
    },
    removeProdutoCarrinho: function(indexProduto, produto) {
      // Emite um evento informando para o componente header que foi removido a quantidade do produto selecionado para remoção
      this.$root.$emit(
        "REMOVED_ITEM_CART",
        this.produtos[indexProduto].quantidade
      );
      // Remove do template o produto que possuir aquele nome
      for (let i = 0; i < this.produtos.length; i++) {
        if (this.produtos[i].name === produto.name) {
          this.produtos.splice(i, 1);
        }
      }

      this.$forceUpdate();
      // Salva o novo array de produtos no localstorage sem o elemento removido
      localStorage.produtos = JSON.stringify(this.produtos);
      // Recalcula o total
      this.getTotalVista();
    },
    getTotalVista: function() {
      // Calcula o total a vista de todos os produtos com base em seu valor * quantidade
      let total = 0;
      for (let i = 0; i < this.produtos.length; i++) {
        let valor = this.produtos[i].price;
        valor = valor.replace(".", "");
        valor = valor.replace(",", "");
        valor = parseFloat(valor);
        total = total + (valor * this.produtos[i].quantidade) / 100;
      }
      this.totalVista = total.toLocaleString({ minimumFractionDigits: 2 });
      this.$forceUpdate();
    },
    limpaCarrinho: function() {
      // Limpa os produtos do template, localstorage e emite evento para o header zerar a quantidade de elementos do carrinho
      this.produtos = [];
      localStorage.produtos = [];
      this.$root.$emit("REMOVED_ITEM_CART", localStorage.qt_cart);
      this.getTotalVista();
    },
    incrementaQuantidadeLocalStorage: function(produto) {
      // Adiciona um novo produto e incrementa quantidade no localStorage
      let produtos = [];
      produtos = JSON.parse(localStorage.produtos);
      produtos.push(produto);
      localStorage.produtos = JSON.stringify(produtos);
    },
    decrementaQuantidadeLocalStorage: function(produto) {
      // Remove um produto do array e decrementa quantidade no localStorage
      let produtos = [];
      produtos = JSON.parse(localStorage.produtos);
      for (let i = 0; i < this.produtos.length; i++) {
        if (produtos[i].name === produto.name) {
          produtos.splice(i, 1);
          return;
        }
      }
      localStorage.produtos = JSON.stringify(produtos);
    }
  },
  mounted: function() {
    this.getProdutosCarrinho();
  }
};
</script>

<style lang="scss">
// Importação de fontes
@font-face {
  font-family: "SourceSansPro Bold";
  src: url("../assets/fonts/SourceSansPro-Bold.ttf") format("truetype");
}

// Cores
$dark_gray: #434343;
$light-gray: #aaaaaa;
$soft-gray: #909090;
$violet-color: #8e36b7;
$dark-violet: #712b91;
$gray-btn: #cfcfcf;

// Mantém o footer no bottom mesmo que não haja conteúdo suficiente
.wrapper {
  min-height: 70vh;
  min-height: -webkit-calc(100vh - 166px);
  min-height: -moz-calc(100vh - 166px);
  min-height: calc(100vh - 166px);
  margin-top: 20px;
}

.text-sem-produtos {
  color: $soft-gray;
  font-family: "SourceSansPro Bold";
}

.title-table {
  display: flex;
  align-items: center;
  font-family: "SourceSansPro Bold";
  font-size: 18px;
  color: $dark_gray;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border-bottom: 1px solid $light-gray;
  padding: 10px;
  text-align: left;
}

.first-th {
  padding-left: 35px;
}

.type-product {
  margin-left: 25px;
}

.icon-trash {
  width: 15px;
  filter: invert(99%) sepia(1%) saturate(971%) hue-rotate(316deg)
    brightness(96%) contrast(69%);
  cursor: pointer;
}

.inline-flex {
  display: inline-flex;
}

#col-limpar-carrinho {
  display: inline-flex;
  align-items: center;
}

.description-product-cart {
  margin-left: 10px;
  margin-bottom: 0;
}

.div-controller-quantidade {
  display: inline-flex;
}

.input-qtd-cart {
  width: 30px;
  text-align: center;
}

.action-qtd-button-left {
  width: 20px;
  border: 1px solid $soft-gray;
  text-align: center;
  color: $soft-gray;
  text-align: center;
  border-top-left-radius: 2px 15%;
  border-bottom-left-radius: 2px 15%;
  cursor: pointer;
}

.action-qtd-button-right {
  width: 20px;
  border: 1px solid $soft-gray;
  text-align: center;
  color: $soft-gray;
  text-align: center;
  border-top-right-radius: 2px 15%;
  border-bottom-right-radius: 2px 15%;
  cursor: pointer;
}

.text-total {
  font-family: "SourceSansPro Bold";
  color: $dark_gray;
  text-align: right;
}

.text-parcelado {
  font-family: "SourceSansPro Regular";
  color: $dark_gray;
}

.text-limpa-carrinho {
  font-family: "SourceSansPro Regular";
  margin-bottom: 0;
}

.text-money {
  color: $violet-color;
  font-size: 22px;
}

#row-totais {
  text-align: right;
  border-bottom: 1px solid $soft-gray;
  margin-left: 5px;
}

#col-limpar-carrinho {
  display: flex;
  cursor: pointer;
}

.btn-cart {
  width: 200px;
  height: 50px;
  border-radius: 3px;
  text-align: center;
  border: 0px;
  transition: 0.3s;
}

#btn-continuar-comprando {
  background-color: $gray-btn;
  color: $dark-gray;
}

#btn-continuar-comprando:hover {
  background-color: $violet-color;
  color: white;
}

#btn-concluir-compra {
  background-color: $violet-color;
  color: white;
}

#btn-concluir-compra:hover {
  background-color: $dark-violet;
}

#col-botoes-cart {
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 15px;
}

@media only screen and (max-width: 438px) {
  #col-botoes-cart {
    margin-top: 15px;
  }

  .btn-cart {
    width: auto;
  }
}

@media all and (max-width: 991px) {
  .hidden-sm {
    display: none !important;
  }

  .responsive-table {
    font-size: 13px;
  }

  .responsive-table th,
  .responsive-table td,
  .responsive-table tr {
    display: block;
  }

  .responsive-table tr {
    border: 1px solid #ddd;
    margin-bottom: 30px;
  }

  .responsive-table td {
    border: none;
    border-bottom: 1px solid #ddd;
    position: relative;
    padding: 5px 0 5px 40%;
    white-space: normal;
    text-align: left;
    margin: 0;
    font-style: normal;
  }

  .responsive-table td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 40%;
    padding-right: 10px;
    white-space: nowrap;
    text-align: left;
    color: #333;
  }

  .responsive-table td:before {
    content: attr(data-title);
    color: $dark-gray;
  }

  .responsive-table td:last-child {
    border-bottom: none;
  }
}
</style>
