<script setup lang="ts">
import { ref } from 'vue';
import DescriptionItem from '@/components/DescriptionItem.vue'
const liked = ref(false);
const likes = ref(12);
const visitors = ref(982);

function likeHandler() {
  liked.value = !liked.value;
  likes.value += liked.value ? 1 : -1;
}
</script>

<template>
<main class="home-view">
  <DescriptionItem>
    <template #heading>
      <i class="home-view__like-btn fa-heart" :class="liked ? 'fas' : 'far'" @click="likeHandler"></i>
    </template>
    <span>{{ likes }} likes</span>
  </DescriptionItem>
  <DescriptionItem>
    <template #heading>Number of site visitors</template>     
    <span>{{ visitors }} people</span>
  </DescriptionItem>
  <DescriptionItem>
    <template #heading>Time spent looking for a job</template>
    <span>1 year 5 month 5 days 20 hours 3 minutes 20 seconds</span>
  </DescriptionItem>
  <DescriptionItem>
    <template #heading>Links</template>
    <a href="https://www.linkedin.com/in/rodion-shlomo-solomonyk-153991178/" target="_blank">
      <i class="fab fa-linkedin"></i>
      LinkedIn
    </a> |
    <a href="https://github.com/coddicat" target="_blank">
      <i class="fab fa-github"></i>
      GitHub
    </a> |
    <a href="https://www.facebook.com/shlomo.solomonik" target="_blank">
      <i class="fab fa-facebook"></i>
      Facebook
    </a>    
  </DescriptionItem>
</main>
</template>

<style lang="scss">
.home-view {
  &__like-btn {
    margin-left: -5px;
    padding: 5px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;  
    background-color: transparent;
    transition: background-color 0.3s ease ;
    cursor: pointer;
    &:hover {
      background-color: #666;
      transition: background-color 0.3s ease ;
    }
  }
}
</style>