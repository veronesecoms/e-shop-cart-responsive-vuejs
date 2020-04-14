<template>
  <footer>
    <h5 id="logo-mkt-footer">
      MktPlace
    </h5>
  </footer>
</template>

<style lang="scss">

  // Importação de fontes
  @font-face {
    font-family: 'SourceSansPro Bold';
    src: url('../assets/fonts/SourceSansPro-Bold.ttf') format('truetype');
  }

  // Cores
  $light-gray: #bbbbbb;
  $dark-gray: #666666;

  footer {
    background-color: $light-gray;
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #logo-mkt-footer {
    font-family: 'SourceSansPro Bold';
    font-size: 25px;
    color: $dark-gray;
  }

</style>
