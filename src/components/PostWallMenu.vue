<script setup>

</script>

<template>
  <div class="box w-[309px] p-8">
    <button class="button w-[261px] h-[54px]">張貼動態</button>
    <ul class="pt-4">
      <li class="flex items-center pb-4">
        <img class="avatar w-[50px] h-[50px]" src="../assets/images/user.png" alt="">
        <span class="pl-4 text-bold">jacky chang</span>
      </li>
      <li class="flex items-center pb-4">
        <div class="w-[50px] h-[50px] border-2 flex items-center justify-center bg-sky rounded-full">
          <i class="fa-solid fa-bell"></i>
        </div>
        <span class="pl-4 text-bold">追蹤名單</span>
      </li>
      <li class="flex items-center">
        <div class="w-[50px] h-[50px] border-2 flex items-center justify-center bg-sky rounded-full">
          <i class="fa-solid fa-thumbs-up"></i>
        </div>
        <span class="pl-4 text-bold">我按讚的文章</span>
      </li>
    </ul>
  </div>
</template>
