<script setup lang="ts">
import { usePropertyStore } from '@/stores/properties';
import { computed } from 'vue';

const propertyStore = usePropertyStore();
const properties = computed(() => propertyStore.properties);
</script>

<template>
  <div class="my-intro">
    <div class="green my-intro__title">{{ properties?.title }}</div>
    <div class="my-intro__subtitle" v-html="properties?.subtitle"></div>
    <div class="green my-intro__email">
      <i class="fas fa-envelope"></i>
      <span> {{ properties?.email }} </span>
    </div>    
  </div>
</template>

<style lang="scss">
.my-intro {
  text-align: center;    

  &__title {
    font-weight: 500;
    font-size: 2.6rem;
    //color: greenyellow;
  }

  &__subtitle {
    font-size: 1.2rem;
    font-weight: 400;
  }

  &__email {
    line-height: 2rem;
    font-size: 1rem;
    font-weight: 400;
    //color: greenyellow;
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
