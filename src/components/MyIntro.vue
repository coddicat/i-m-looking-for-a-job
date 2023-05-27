<script setup lang="ts">
import { usePropertyStore } from '@/stores/properties';
import { computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const propertyStore = usePropertyStore();
const properties = computed(() => propertyStore.properties);
const route = useRoute();
const router = useRouter();
const timeout = 20000;
let timer: number | undefined;
let stopped = true;
const autoRouters = ['home', 'about'];

onMounted(() => (timer = window.setTimeout(tick, timeout)));
onUnmounted(stop);

function tick() {
  if (timer) {
    window.clearTimeout(timer);
  }
  if (!stopped) {
    return;
  }
  const currentIndex = autoRouters.indexOf(route.name?.toString() ?? 'home');
  const nextIndex =
    currentIndex >= autoRouters.length - 1 || currentIndex < 0
      ? 0
      : currentIndex + 1;
  router.push({ name: autoRouters[nextIndex] });
  timer = window.setTimeout(tick, timeout);
}

function stop() {
  stopped = false;
  window.clearTimeout(timer);
}
</script>

<template>
  <div class="my-intro">
    <div class="green my-intro__title">{{ properties?.title }}</div>
    <div class="my-intro__subtitle" v-html="properties?.subtitle"></div>
    <div class="green my-intro__email">
      <i class="fas fa-envelope"></i>
      <span> {{ properties?.email }} </span>
    </div>
    <div class="my-intro__router">
      <RouterLink
        @click="stop"
        :to="{ name: 'home' }"
        class="my-intro__router-link"
        active-class="my-intro__router-link--active"
      >
        Home
      </RouterLink>
      <RouterLink
        @click="stop"
        :to="{ name: 'about' }"
        class="my-intro__router-link"
        active-class="my-intro__router-link--active"
      >
        About
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/colors.scss';

.my-intro {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__title {
    font-weight: 500;
    font-size: 2.6rem;
    color: $primary;
  }

  &__subtitle {
    font-size: 1.2rem;
    color: $secondary;
  }

  &__email {
    line-height: 2rem;
    font-size: 1rem;
    color: $primary;
    i {
      margin-right: 5px;
    }
  }

  &__router {
    margin: 1rem 0;
    display: flex;
    gap: 0.5rem;
    justify-content: center;

    &-link {
      border: 1px solid $primary;
      padding: 0.2rem 0.4rem;
      color: $primary;
      background-color: $background;
      opacity: 0.9;
      transition: opacity 0.5s ease;
      text-decoration: none;

      &--active {
        background-color: $primary;
        color: $background;
      }

      &:hover {
        opacity: 1;
      }
    }
  }
}

@media (min-width: 1024px) {
  .my-intro {
    text-align: left;
    &__router {
      justify-content: left;
    }
  }
}
</style>
