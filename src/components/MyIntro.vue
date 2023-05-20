<template>
  <div class="my-intro">
    <div class="my-intro__title">I am looking for a job!</div>
    <div class="my-intro__subtitle">
      Software architect & full-stack developer
    </div>
    <div class="my-intro__email">
      <i class="fas fa-envelope"></i>
      <span>solomonik.rodion@gmail.com</span>
    </div>    
  </div>
</template>

<style lang="scss">
.my-intro {
  text-align: center;    

  &__title {
    font-weight: 500;
    font-size: 2.6rem;
    color: greenyellow;
  }

  &__subtitle {
    font-size: 1.2rem;
    font-weight: 400;
  }

  &__email {
    line-height: 2rem;
    font-size: 1rem;
    font-weight: 400;
    color: greenyellow;
    i {
      margin-right: 5px;
    }
  }
}

@media (min-width: 1024px) {
  .my-intro {    
      text-align: left;        
  }
}
</style>
