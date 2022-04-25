<script setup>
import { reactive, onBeforeUnmount } from 'vue';
import Input from '../components/Input.vue';
import { storeToRefs } from 'pinia';
import { useValidateStore } from '@/store';
const validateStore = useValidateStore();
const { validateList } = storeToRefs(validateStore);
// eslint-disable-next-line no-undef
const emit = defineEmits(['setComp']);

const setComp = () => {
  emit('setComp', 1);
};

// eslint-disable-next-line no-unused-vars
const loginData = reactive({
  email: '',
  password: ''
});
const handleSubmit = () => {
  // eslint-disable-next-line no-unused-vars
  if (validateList.value.length !== 0) {
    validateStore.updateErrorFlag(true);
    // console.error('validateList.value', validateList.value);
    return;
  };
};

onBeforeUnmount(() => {
  validateStore.resetVaild();
});
</script>

<template>
  <div class="text-center">
    <Input
      v-model.trim="loginData.email"
      :vaildField="['required', 'email']"
      validId="email"
      placeholder="Email"
    />
    <Input v-model.trim="loginData.password" :vaildField="['required', 'password']" validId="password"  placeholder="Password" />
    <!-- <p class="text-red">帳號或密碼錯誤，請重新輸入！</p> -->
    <button @click="handleSubmit" class="mt-6 w-[374px] h-[54px] button block">登入</button>
    <a class="text-black pt-3 block" @click.prevent="setComp">註冊帳號</a>
  </div>
</template>
