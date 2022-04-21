<script setup>
// import LoginSign from '../components/LoginSign.vue';
import LoginRegister from '../components/LoginRegister.vue';
</script>
<template>
  <section class="w-[869px] h-[539px] fixed top-0 right-0 bottom-0 left-0 m-auto p-12 border-2 flex items-center bg-[#EFECE7] shadow-light">
    <img src="../assets/images/img.svg" alt="" />
    <div class="flex flex-col items-center pl-6">
      <img src="../assets/images/MetaWall.png" alt="">
      <p class="font-bold text-2xl pb-6">到元宇宙展開全新社交圈</p>
      <!-- <LoginSign /> -->
      <LoginRegister />
    </div>
  </section>
</template>
