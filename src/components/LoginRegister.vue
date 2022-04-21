<script setup>
import { reactive, onBeforeUnmount } from 'vue';
import Input from '../components/Input.vue';
import { useValidateStore } from '@/store';
const validateStore = useValidateStore();

// eslint-disable-next-line no-unused-vars
const loginData = reactive({
  userName: '',
  email: '',
  password: ''
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
      placeholder="暱稱"
    />
    <Input
      v-model.trim="email"
      :vaildField="['required', 'email']"
      validId="email"
      placeholder="Email"
    />
    <Input v-model.trim="password" :vaildField="['required', 'password']" validId="password" placeholder="Password" />
    <button @click="handleSubmit" class="mt-6 w-[374px] h-[54px] button block">註冊</button>
    <a class="text-black pt-3 block" href="">登入</a>
  </div>
</template>
