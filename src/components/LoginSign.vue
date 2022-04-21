<script setup>
import { reactive, onBeforeUnmount } from 'vue';
import Input from '../components/Input.vue';
import { useValidateStore } from '@/store';
const validateStore = useValidateStore();

// eslint-disable-next-line no-unused-vars
const loginData = reactive({
  userName: '',
  password: '',
});
const handleSubmit = () => {
  // eslint-disable-next-line no-unused-vars
  validateStore.updateErrorFlag(true);
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
