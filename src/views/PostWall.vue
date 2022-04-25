<script setup>
import Post from '../components/Post.vue';
import SearchBar from '../components/SearchBar.vue';
import Select from '../components/Select.vue';
import FollowStatus from '../components/FollowStatus.vue';
import NoRecord from '../components/NoRecord.vue';
</script>

<template>
    <FollowStatus />
    <div class="sm:flex justify-between">
      <Select />
      <SearchBar />
    </div>
      <Post />
      <NoRecord />
</template>
