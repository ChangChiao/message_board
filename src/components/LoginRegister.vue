<script setup>
import { reactive, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import Input from '../components/Input.vue';
import { postAPIData } from '@/utils/api/ajax';
import { useValidateStore, useUserStore } from '@/store';
import { storeToRefs } from 'pinia';
const validateStore = useValidateStore();
const useStore = useUserStore();
const { validateList } = storeToRefs(validateStore);
// eslint-disable-next-line no-undef
const emit = defineEmits(['setComp']);
const router = useRouter();

const setComp = () => {
  emit('setComp', 0);
};
// eslint-disable-next-line no-unused-vars
const loginData = reactive({
  userName: '',
  email: '',
  password: ''
});
const handleSubmit = async () => {
  // eslint-disable-next-line no-unused-vars
  if (validateList.value.length !== 0) {
    validateStore.updateErrorFlag(true);
    return;
  }
  try {
    const res = await postAPIData('/users/sign_up', loginData);
    const {
      status,
      user: { token, userName }
    } = res;
    if (status === 'success') {
      localStorage.setItem('token', token);
      useStore.updateUser({ userName });
    }
    router.push('/');
  } catch (error) {
    console.log('error', error);
  }
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
    <Input
      v-model.trim="loginData.password"
      :vaildField="['required', 'password']"
      validId="password"
      type="password"
      placeholder="Password"
    />
    <button @click="handleSubmit" class="mt-6 w-[374px] h-[54px] button block">
      註冊
    </button>
    <a class="text-black pt-3 block cursor-pointer" @click.prevent="setComp"
      >登入</a
    >
  </div>
</template>
