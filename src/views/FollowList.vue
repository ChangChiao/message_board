<script setup>
import FollowListItem from '../components/FollowListItem.vue';
import { reactive } from 'vue';
const list = reactive([
  { id: 1, userName: 'amy', time: '2022/1/10 12:00', days: 20 },
  { id: 2, userName: 'mike', time: '2022/1/10 12:00', days: 20 }
]);
</script>

<template>
  <section>
    <h1 class="title">追蹤名單</h1>
    <ul class="pt-4">
      <template v-for="item in list" :key="item.id">
        <FollowListItem />
      </template>
    </ul>
  </section>
</template>
