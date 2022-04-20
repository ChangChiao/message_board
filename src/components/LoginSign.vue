<script setup>
import { reactive, ref, onBeforeUnmount } from 'vue';
import Input from '../components/Input.vue';
import { useValidateStore } from '@/store';
const validateStore = useValidateStore();
const loginData = reactive({
  userName: '',
  password: '',
});
const handleSubmit = () => {
  updateErrorFlag(true);
};

onBeforeUnmount(() => {
  validateStore.resetVaild();
});
</script>

<template>
  <div>
    <Input
      v-model.trim="userName"
      :vaildField="['required', 'userName']"
      validId="userName"
    />
    <Input v-model.trim="password" />
    <button @click="handleSubmit">登入</button>
  </div>
</template>
