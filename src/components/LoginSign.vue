<script setup>
import { reactive, onBeforeUnmount, inject } from 'vue';
import { useRouter } from 'vue-router';
import Input from '../components/Input.vue';
import { storeToRefs } from 'pinia';
import { useValidateStore, useUserStore } from '@/store';
import { postAPIData } from '@/utils/api/ajax';
const validateStore = useValidateStore();
const useStore = useUserStore();
const { validateList } = storeToRefs(validateStore);
const controlLoading = inject('controlLoading');
// eslint-disable-next-line no-undef
const emit = defineEmits(['setComp']);
const router = useRouter();

const setComp = () => {
  emit('setComp', 1);
};

// eslint-disable-next-line no-unused-vars
const loginData = reactive({
  email: '',
  password: ''
});
const handleSubmit = async () => {
  // eslint-disable-next-line no-unused-vars
  if (validateList.value.length !== 0) {
    validateStore.updateErrorFlag(true);
    // console.error('validateList.value', validateList.value);
    return;
  }
  try {
    controlLoading(true);
    const res = await postAPIData('/users/sign_in', loginData);
    const {
      status,
      user: { token, name }
    } = res;
    if (status === 'success') {
      localStorage.setItem('token', token);
      localStorage.setItem('room', []);
      useStore.updateUser({ name });
    }
    router.push('/');
  } catch (error) {
    console.log('error', error);
  } finally {
    controlLoading(false);
  }
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
    <Input
      v-model.trim="loginData.password"
      :vaildField="['required', 'password']"
      validId="password"
      type="password"
      placeholder="Password"
    />
    <!-- <p class="text-red">帳號或密碼錯誤，請重新輸入！</p> -->
    <button @click="handleSubmit" class="mt-6 w-[374px] h-[54px] button block">
      登入
    </button>
    <a class="block pt-3 text-black cursor-pointer" @click.prevent="setComp"
      >註冊帳號</a
    >
  </div>
</template>
