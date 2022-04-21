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
    <div>追蹤名單</div>
    <ul>
      <template v-for="item in list" :key="item.id">
        <FollowListItem />
      </template>
    </ul>
  </section>
</template>
