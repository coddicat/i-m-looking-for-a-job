<script setup lang="ts">
import moment from 'moment';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import DescriptionItem from '@/components/DescriptionItem.vue'
import { usePropertyStore } from '@/stores/properties';
import { useAuthStore } from '@/stores/current-user';
import { useLikesStore } from '@/stores/likes';
import { useVisitorsStore } from '@/stores/visitors';
import { useLinksStore } from '@/stores/links';
import '@/stores/likes';

const propertyStore = usePropertyStore();
const currentUserStore = useAuthStore();
const likesStore = useLikesStore();
const visitorsStore = useVisitorsStore();
const linksStore = useLinksStore();

const uid = computed(() => currentUserStore.currentAuthUser?.uid);
const currentUser = computed(() => currentUserStore.currentUser);
const liked = computed(() => !!currentUser.value?.liked);
const likes = computed(() => likesStore.likesCount);
const visitors = computed(() => visitorsStore.visitorsCount);
const links = computed(() => linksStore.links);
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
  if (days > 0) {
    result += `${days} days, `;
  }
  if (hours > 0) {
    result += `${hours} hours, `;
  }
  result += `${minutes} minutes, and ${seconds} seconds`;

  return result;
}

function nextTick() {
  if (stopped) {
    return;
  }
  const datetime = propertyStore.properties?.startDateTime.toDate();
  timeSpent.value = detailedFromNow(datetime);
  timer = window.setTimeout(nextTick, 500);
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
    window.clearTimeout(timer);
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
    <a v-for="(link, $i) in links" :key="$i" :href="link.url" target="_blank" class="home-view__link">
      <i :class="link.icon"></i>
      {{ link.text }}
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

  &__link {
    margin-right: 5px;
    padding-right: 5px;
    border-right: 1px solid;
    &:last-of-type {
      border-right: none;
    }
  }
}
</style>