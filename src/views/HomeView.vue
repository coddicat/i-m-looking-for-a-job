<script setup lang="ts">
import moment from 'moment';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import DescriptionItem from '@/components/DescriptionItem.vue'
import { usePropertyStore } from '@/stores/properties';
import { useAuthStore } from '@/stores/current-user';
import { useLikesStore } from '@/stores/likes';
import { useVisitorsStore } from '@/stores/visitors';
import '@/stores/likes';

const propertyStore = usePropertyStore();
const currentUserStore = useAuthStore();
const likesStore = useLikesStore();
const visitorsStore = useVisitorsStore();

const uid = computed(() => currentUserStore.currentAuthUser?.uid);
const currentUser = computed(() => currentUserStore.currentUser);
const liked = computed(() => !!currentUser.value?.liked);
const likes = computed(() => likesStore.likesCount);
const visitors = computed(() => visitorsStore.visitorsCount);
const timeSpent = ref<string>('N/A');

let stopped = false;
let timer: number | undefined = undefined;

function detailedFromNow(datetime: moment.MomentInput) {
  const duration = moment.duration(moment().diff(moment(datetime)));
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  let result = '';
  if (months > 0) {
    result += `${months} months, `;
  }
  result += `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;

  return result;
}

function nextTick() {
  if (stopped) {
    return;
  }
  const datetime = propertyStore.properties?.JobSearchStartDateTime.toDate();
  timeSpent.value = detailedFromNow(datetime);
  timer = setTimeout(nextTick, 500);
}

async function likeHandler() {
  if (!uid.value) {
    return;
  }
  await likesStore.setLiked(uid.value, !liked.value);
}

onMounted(nextTick);

onUnmounted(() => {
  stopped = true;
  if (timer) {
    clearTimeout(timer);
  }
});
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
    <span>{{ timeSpent }}</span>
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