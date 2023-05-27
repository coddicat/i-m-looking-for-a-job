<script setup lang="ts">
import DescriptionItem from '@/components/DescriptionItem.vue';
import { usePropertyStore } from '@/stores/properties';
import { computed } from 'vue';
const propertiesStore = usePropertyStore();
const about = computed(() => propertiesStore.properties?.about);
</script>

<template>
  <main class="about-view">
    <DescriptionItem>
      <template #heading> About me </template>
      <div class="about-view__text" v-html="about"></div>
    </DescriptionItem>
  </main>
</template>

<style lang="scss">
.about-view {
  width: 40rem;
  &__text {
    text-align: justify;
  }
}
</style>
