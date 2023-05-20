<script setup lang="ts">
import { RouterView } from 'vue-router'
import MyIntro from './components/MyIntro.vue'
</script>

<template>
  <div class="app-header">
    <img alt="Vue logo" class="app-header__logo" src="@/assets/avatar.jpg" width="125" height="125" />
    <MyIntro/>
  </div>
  <RouterView />
</template>

<style lang="scss">
.app-header {
  line-height: 1.5;
  max-height: 100vh;

  &__logo {
    display: block;
    margin: 0 auto 2rem;
    border-radius: 50%;
  }
}
@media (min-width: 1024px) {
  .app-header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    
    &__logo {
      margin: 0 2rem 0 0;
    }
  }
}
</style>
