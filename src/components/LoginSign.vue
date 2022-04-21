<script setup>
import { reactive, onBeforeUnmount } from 'vue';
import Input from '../components/Input.vue';
import { useValidateStore } from '@/store';
const validateStore = useValidateStore();

// eslint-disable-next-line no-unused-vars
const loginData = reactive({
  userName: '',
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
      v-model.trim="email"
      :vaildField="['required', 'email']"
      validId="email"
      placeholder="Email"
    />
    <Input v-model.trim="password" :vaildField="['required', 'userName']" validId="password"  placeholder="Password" />
    <p class="text-red">帳號或密碼錯誤，請重新輸入！</p>
    <button @click="handleSubmit" class="mt-6 w-[374px] h-[54px] button block">登入</button>
    <a class="text-black pt-3 block" href="">註冊帳號</a>
  </div>
</template>
