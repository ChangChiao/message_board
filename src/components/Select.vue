<script setup>
import { defineProps, defineEmits } from 'vue';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  option: {
    type: Array,
    default: () => []
  },
  modelValue: null
});
const emit = defineEmits(['change']);
const handelChange = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

option
<template>
  <select :value='modelValue' @change='handelChange' class="border-2 pl-2 w-full lg:w-[156px] h-[46px]" name="" id="">
    <option v-for="item in option" :value='item.key' :key="item.key">
      {{ item.content }}
    </option>
  </select>
</template>
