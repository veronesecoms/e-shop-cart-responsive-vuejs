<template>
  <div class="container wrapper">
    <modal-checkout></modal-checkout>
    <form
      id="checkout_form"
      @submit="checkForm"
    >
      <div class="row mt-2">
        <div class="col-md-6 mt-4">
          <label class="label-input mb-0" for="input-nome-checkout">Nome*</label> <br>
          <input class="input-text" id="input-nome-checkout" type="text" v-model="nome">
        </div>

        <div class="col-md-6 mt-4">
          <label class="label-input mb-0" for="input-cep-checkout">CEP* </label>
          <input @keyup="buscaCEP" v-mask="'#####-###'" class="input-text" id="input-cep-checkout" type="text" v-model="cep">
        </div>

        <div class="col-md-6 mt-4">
          <label class="label-input mb-0" for="input-email-checkout">E-mail* </label>
          <input class="input-text" id="input-email-checkout" type="text" v-model="email">
        </div>

        <div class="col-md-4 mt-4">
          <label class="label-input mb-0" for="input-endereco-checkout">Endereço* </label>
          <input class="input-text" id="input-endereco-checkout" type="text" v-model="endereco">
        </div>

        <div class="col-md-2 mt-4">
          <label class="label-input mb-0" for="input-numero-checkout">Número* </label>
          <input v-mask="'######'" class="input-text" id="input-numero-checkout" type="text" v-model="numero">
        </div>

        <div class="col-md-6 mt-4">
          <label class="label-input mb-0" for="input-cpf-checkout">CPF* </label>
          <input v-mask="'###.###.###-##'" class="input-text" id="input-cpf-checkout" type="text" v-model="cpf">
        </div>

        <div class="col-md-3 mt-4">
          <label class="label-input mb-0" for="input-complemento-checkout">Complemento </label>
          <input class="input-text" id="input-complemento-checkout" type="text" v-model="complemento">
        </div>

        <div class="col-md-3 mt-4">
          <label class="label-input mb-0" for="input-bairro-checkout">Bairro* </label>
          <input class="input-text" id="input-bairro-checkout" type="text" v-model="bairro">
        </div>

        <div class="col-md-3 mt-4">
          <label class="label-input mb-0" for="input-datanasc-checkout">Data de nascimento* </label>
          <input v-mask="'##/##/#####'" placeholder="dd/mm/yyyy" class="input-text" id="input-datanasc-checkout" type="text" v-model="data_nascimento">
        </div>

        <div class="col-md-3 mt-4">
          <label class="label-input mb-0" for="input-telefone-checkout">Telefone* </label>
          <input v-mask="'(##)#####-####'" class="input-text" id="input-telefone-checkout" type="text" v-model="telefone">
        </div>

        <div class="col-md-4 mt-4">
          <label class="label-input mb-0" for="input-cidade-checkout">Cidade* </label>
          <input class="input-text" id="input-cidade-checkout" type="text" v-model="cidade">
        </div>

        <div class="col-md-2 mt-4">
          <label class="label-input mb-0" for="input-estado-checkout">Estado* </label>
          <input class="input-text" id="input-estado-checkout" type="text" v-model="estado">
        </div>

      </div>

      <div class="row mt-4">
        <div class="col-md-6">
          <p v-if="errors.length">
            <b id="errors-text">Por favor, corrija o(s) seguinte(s) erro(s):</b>
            <ul>
              <li class="errors-text-description" v-bind:key="error" v-for="error in errors">
                {{ error }}
              </li>
            </ul>
          </p>
        </div>
        <div id="col-btn-concluir-checkout" class="col-md-6">
          <button id="btn-concluir-compra" class="btn-checkout">
            Concluir compra
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'
import axios from 'axios'

export default {
  directives: { mask },
  data: function () {
    return {
      nome: '',
      cep: '',
      email: '',
      endereco: '',
      numero: '',
      cpf: '',
      complemento: '',
      bairro: '',
      data_nascimento: '',
      telefone: '',
      cidade: '',
      estado: '',
      errors: []
    }
  },
  methods: {
    buscaCEP: function () {
      // Se digitar os caracteres suficientes para realizar uma pesquisa de cpf, busca o endereço
      if (this.cep.length === 9) {
        let cep = this.cep.replace('-', '')
        axios
          .get('https://viacep.com.br/ws/' + cep + '/json/')
          .then(response => {
            this.logradouro = response.data.logradouro
            this.bairro = response.data.bairro
            this.cidade = response.data.localidade
            this.estado = response.data.uf
          })
      }
    },
    checkForm: function (e) {
      // Validações de formulário
      this.errors = []

      if (!this.nome) {
        this.errors.push('O nome é obrigatório.')
      }
      if (!this.cep) {
        this.errors.push('O cep é obrigatório')
      }
      if (!this.email) {
        this.errors.push('O email é obrigatório')
      }
      if (!this.endereco) {
        this.errors.push('O endereço é obrigatório')
      }
      if (!this.numero) {
        this.errors.push('O número é obrigatório')
      }
      if (!this.cpf) {
        this.errors.push('O CPF é obrigatório')
      }
      if (!this.bairro) {
        this.errors.push('O bairro é obrigatório')
      }
      if (!this.data_nascimento) {
        this.errors.push('A data de nascimento é obrigatória')
      }
      if (!this.telefone) {
        this.errors.push('O telefone é obrigatório')
      }
      if (!this.cidade) {
        this.errors.push('A cidade é obrigatória')
      }
      if (!this.estado) {
        this.errors.push('O estado é obrigatório')
      }

      e.preventDefault()

      if (!this.errors.length) {
        this.finalizaCheckout()
      }
    },
    finalizaCheckout: function () {
      // Abre o modal
      window.location = '#open-modal'
      // Emite evento para header limpando todas as quantidades do carrinho
      this.$root.$emit('REMOVED_ITEM_CART', localStorage.qt_cart)
      // Remove do localstorage os produtos e quantidade do carrinho
      localStorage.removeItem('produtos')
      localStorage.removeItem('qt_cart')
    }
  }
}

</script>

<style lang="scss">
    // Cores
  $dark_gray: #434343;
  $gray-border-input: #909090;
  $gray-label-input: #565656;

  .input-text{
    width: 100%;
    padding: 5px;
    border: none;
    border: 1px solid $gray-border-input;
    border-radius: 2px;
  }

  .label-input {
    color: $gray-label-input;
    font-family: 'SourceSansPro Regular'
  }

  .btn-checkout {
    width: 300px;
    height: 50px;
    border: 0;
    transition: 0.3s;
  }

  #col-btn-concluir-checkout {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
  }

  #errors-text {
    font-family: 'SourceSansPro Bold';
    color: $gray-label-input
  }

  .errors-text-description {
    font-family: 'SourceSansPro Regular';
    color: $dark_gray
  }

</style>
