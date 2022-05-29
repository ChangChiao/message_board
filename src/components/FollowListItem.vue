<script setup>
import UserCard from '../components/UserCard.vue';
import { defineProps } from 'vue';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  followInfo: {
    type: Object,
    required: true,
    default: () => {}
  }
});
</script>

<template>
  <li class="box-rounded flex items-baseline p-4 h-[77px] mb-4 justify-between">
    <UserCard :followInfo="followInfo" />
    <!-- <span>您已經追蹤90天!</span> -->
  </li>
</template>
