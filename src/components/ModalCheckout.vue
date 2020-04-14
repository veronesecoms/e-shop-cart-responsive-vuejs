<template>
  <div id="open-modal" class="modal-window">
    <router-link to="/home">
      <a class="modal-close">X</a>
    </router-link>
    <div class="container">
      <div class="row">
        <div id="col-icon" class="col-md-12">
          <img id="icon-done-modal" src="../assets/icons/done.svg">
        </div>
        <div id="col-text-modal" class="col-md-12">
          <h6>
            <strong>Seu cadastro foi solicitado com sucesso!</strong>
          </h6>
        </div>
        <router-link id="a-home" to="/home">
          <div id="col-voltar-modal">
            <img id="icon-voltar-modal" src="../assets/icons/left-arrow.svg">
            <h6 id="text-voltar-modal">
              <strong>VOLTAR PARA HOME</strong>
            </h6>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

  // Cores
  $violet-color: #8e36b7;

  .modal-window {
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s;
    &:target {
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    }
    &>div {
      border-radius: 3px;
      width: 400px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 2em;
      background: #ffffff;
    }
    h1 {
      font-size: 150%;
      margin: 0 0 15px;
    }
  }

  #col-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-close {
    color: #aaa;
    line-height: 50px;
    font-size: 80%;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
    width: 70px;
    text-decoration: none;
    &:hover {
      color: black;
    }
  }

  a {
    color: inherit;
  }

  #icon-done-modal {
    width: 80px;
    height: 80px;
    filter: invert(62%) sepia(58%) saturate(421%) hue-rotate(35deg) brightness(105%) contrast(92%);
  }

  #col-text-modal{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #5f5f5f;
    font-family: 'SourceSansPro Regular'
  }

  #a-home {
    width: 100%;
    text-align: center;
  }

  #icon-voltar-modal {
    filter: invert(25%) sepia(75%) saturate(1862%) hue-rotate(262deg) brightness(92%) contrast(93%);
    width: 20px;
    height: 20px;
  }

  #text-voltar-modal {
    color: $violet-color;
    font-family: 'SourceSansPro Regular';
    margin-left: 5px;
  }

  #col-voltar-modal {
    cursor: pointer;
    display: inline-flex;
    margin: 0 auto;
  }

  .modal-window div:not(:last-of-type) {
    margin-bottom: 15px;
  }

  small {
    color: #aaa;
  }

  .btn {
    background-color: #fff;
    padding: 1em 1.5em;
    border-radius: 3px;
    text-decoration: none;
    i {
      padding-right: 0.3em;
    }
  }

</style>
