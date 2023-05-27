<script setup lang="ts">
import { RouterView } from 'vue-router';
import MyIntro from '@/components/MyIntro.vue';
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
  return (
    authStore.ready &&
    likesStore.ready &&
    propertyStore.ready &&
    visitorsStore.ready &&
    linksStore.ready
  );
});
</script>

<template>
  <div class="app">
    <template v-if="!ready">
      <div class="app__loading">
        <span>
          Loading
          <i class="fas fa-spinner fa-pulse"></i>
        </span>
      </div>
    </template>
    <template v-else>
      <div class="app__header fade-in-fast">
        <img
          alt="Vue logo"
          class="app__header-logo"
          src="@/assets/photo.jpeg"
          width="125"
          height="125"
        />
        <MyIntro />
      </div>
      <div class="app__content fade-in-fast">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.app {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;

  &__header {
    line-height: 1.5;
    max-height: 100vh;
    padding-top: 2rem;

    &-logo {
      display: block;
      margin: 0 auto 2rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  &__loading {
    font-size: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@media (min-width: 1024px) {
  .app {
    display: grid;
    grid-template-columns: 1fr 1fr;

    &__header {
      display: flex;
      place-items: center;
      margin: 0 3.5rem;
      padding-top: 0;

      &-logo {
        margin: 0 2rem 0 0;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
