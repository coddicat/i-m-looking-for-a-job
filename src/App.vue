<script setup lang="ts">
import { RouterView } from 'vue-router'
import MyIntro from '@/components/MyIntro.vue'
import { computed } from 'vue';
import { useAuthStore } from '@/stores/current-user';
import { useLikesStore } from '@/stores/likes';
import { usePropertyStore } from '@/stores/properties';
import { useVisitorsStore } from '@/stores/visitors';
import { useLinksStore } from '@/stores/links';
const authStore = useAuthStore();
const likesStore = useLikesStore();
const propertyStore = usePropertyStore();
const visitorsStore = useVisitorsStore();
const linksStore = useLinksStore();
const ready = computed(() => {
  return authStore.ready && likesStore.ready && propertyStore.ready && visitorsStore.ready && linksStore.ready;
})
</script>

<template>
  <template v-if="ready">
    <div class="app-header">
      <img alt="Vue logo" class="app-header__logo" src="@/assets/avatar.jpg" width="125" height="125" />
      <MyIntro/>
    </div>
    <RouterView />
  </template>
  <template v-else>
    <span class="app-loading">
      Loading
      <i class="fas fa-spinner fa-pulse"></i>
    </span>
  </template>
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
  .app-loading {
    font-size: 2rem;
  }
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
