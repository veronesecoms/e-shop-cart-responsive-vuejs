<template>
  <div>
    <div class="slide fadeSlide">
      <div id="first-slide" class="container">
        <h1 class="text-slide">
          <strong>Notebooks</strong>
        </h1>
        <h5 class="text-slide">
          <strong>As melhores ofertas</strong>
        </h5>
      </div>
    </div>

    <div class="slide fadeSlide">
      <div id="second-slide" class="container">
        <h1 class="text-slide">
          <strong>Computadores</strong>
        </h1>
        <h5 class="text-slide">
          <strong>As melhores ofertas</strong>
        </h5>
      </div>
    </div>

    <div id="dots-container">
      <div class="eye-dot" v-on:click="changeSlide(1)"></div>
      <div class="eye-dot" v-on:click="changeSlide(2)"></div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      // Indice inicial do slider
      slideIndex: 1
    }
  },
  methods: {
    // Troca o slide
    changeSlide: function (n) {
      this.showSlides(this.slideIndex = n)
    },
    // Função principal que mostra os slides
    showSlides: function (n) {
      // Carrega os slides
      var slides = document.getElementsByClassName('slide')
      // Carrega os indicadores circulares
      var dots = document.getElementsByClassName('eye-dot')
      // Remove a visibilidade dos slides
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
      }
      // Remove a classe ativa dos indicadores circulares
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace('active', '')
      }
      // Mostra o slide que possuir posição igual ao slideIndex
      slides[this.slideIndex - 1].style.display = 'block'
      // Insere a classe ativa no indicador circular que possuir posição igua ao slideIndex
      dots[this.slideIndex - 1].className += ' active'
    }
  },
  mounted: function () {
    // Mostra o primeiro slide quando o componente é montado
    this.$nextTick(this.showSlides(1))
  }
}

</script>

<style lang="scss">

  // Cores
  $violet-color: #8e36b7;
  $dark-violet-color: #5f257a;
  $soft-violet-color: #d794f6;

  // Importação das fontes
  @font-face {
    font-family: 'SourceSansPro Black';
    src: url('../assets/fonts/SourceSansPro-Black.ttf') format('truetype');
  }

  @font-face {
    font-family: 'SourceSansPro Bold';
    src: url('../assets/fonts/SourceSansPro-Bold.ttf') format('truetype');
  }

  .slide {
    display: none;
    height: 300px;
    background-image: linear-gradient(to right, $violet-color , $soft-violet-color);
  }

  #first-slide {
    flex-flow: row wrap;
    align-content: center;
    justify-content: space-between;
    display: flex;
    align-items: center;
    text-align: end;
    height: 100%;
    padding: 25px;
  }

  #second-slide {
    flex-flow: row wrap;
    align-content: center;
    justify-content: space-between;
    display: flex;
    align-items: center;
    text-align: end;
    height: 100%;
    padding: 25px;
  }

  .text-slide {
    width: 100%;
    color: #ffffff;
    font-family: "SourceSansPro Black";
  }

  #dots-container {
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .eye-dot{
    cursor: pointer;
    border: 2px solid $violet-color;
    border-radius: 100%;
    position: relative;
    width: 20px;
    height: 20px;
    margin: 10px;
    transition-duration: 0.3s
  }

  .eye-dot:hover {
    border: 2px solid $dark-violet-color
  }

  .eye-dot.active::before {
    content: "";
    display: block;
    position: absolute;
    width: 8px;
    height: 8px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background: $violet-color;
    border-radius: 100%;
    transition-duration: 0.3s;
  }

  .eye-dot.active:hover::before {
    background: $dark-violet-color;
  }

  .fadeSlide {
    -webkit-animation-name: fadeSlide;
    -webkit-animation-duration: 1.5s;
    animation-name: fadeSlide;
    animation-duration: 1.5s;
  }

  @-webkit-keyframes fadeSlide {
    from {opacity: .4}
    to {opacity: 1}
  }

  @keyframes fadeSlide {
    from {opacity: .4}
    to {opacity: 1}
  }

</style>
