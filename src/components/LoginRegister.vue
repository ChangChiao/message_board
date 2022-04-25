<script setup>
import { reactive, onBeforeUnmount } from 'vue';
import Input from '../components/Input.vue';
import { useValidateStore } from '@/store';
import { storeToRefs } from 'pinia';
const validateStore = useValidateStore();
const { validateList } = storeToRefs(validateStore);
// eslint-disable-next-line no-undef
const emit = defineEmits(['setComp']);

const setComp = () => {
  emit('setComp', 0);
};
// eslint-disable-next-line no-unused-vars
const loginData = reactive({
  userName: '',
  email: '',
  password: ''
});
const handleSubmit = () => {
  // eslint-disable-next-line no-unused-vars
  if (validateList.value.length !== 0) {
    validateStore.updateErrorFlag(true);
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
      v-model.trim="loginData.userName"
      :vaildField="['required', 'userName']"
      validId="userName"
      placeholder="暱稱"
    />
    <Input
      v-model.trim="loginData.email"
      :vaildField="['required', 'email']"
      validId="email"
      placeholder="Email"
    />
    <Input v-model.trim="loginData.password" :vaildField="['required', 'password']" validId="password" placeholder="Password" />
    <button @click="handleSubmit" class="mt-6 w-[374px] h-[54px] button block">註冊</button>
    <a class="text-black pt-3 block" @click.prevent="setComp">登入</a>
  </div>
</template>
