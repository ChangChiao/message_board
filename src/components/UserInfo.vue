<script setup></script>

<template>
  <section>
    <ul class="flex items-center">
      <li
        :class="[
          'bg-white border-2 rounded-[8px 8px 0px 0px]',
          { 'bg-black text-white': active === 1 },
        ]"
      >
        暱稱修改
      </li>
      <li
        :class="[
          'bg-white border-2 rounded-[8px 8px 0px 0px]',
          { 'bg-black text-white': active === 2 },
        ]"
      >
        重設密碼
      </li>
    </ul>
  </section>
</template>
