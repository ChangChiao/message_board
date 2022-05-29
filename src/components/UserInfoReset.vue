<script setup>
import { useToast } from 'vue-toastification';
import { reactive, inject } from 'vue';
import { patchAPIData } from '@/utils/api/ajax';
import Input from '../components/Input.vue';
const controlLoading = inject('controlLoading');
const toast = useToast();
const updateData = reactive({
  password: '',
  confirmPassword: ''
});
const resetPassword = async () => {
  if (updateData.password !== updateData.confirmPassword) {
    toast.error('兩次填寫密碼不一致');
    return;
  }
  try {
    controlLoading(true);
    const res = await patchAPIData('/users/update_password', updateData);
    const {
      status,
      user: { token }
    } = res;
    if (status === 'success') {
      localStorage.setItem('token', token);
      toast.success('修改成功');
      updateData.password = '';
      updateData.confirmPassword = '';
    }
  } catch (error) {
    const msg = error.response.data.message;
    msg && toast.error(msg);
  } finally {
    controlLoading(false);
  }
};
</script>
<template>
  <div>
    <h3 class="">輸入新密碼</h3>
    <Input
      v-model.trim="updateData.password"
      :vaildField="['required', 'password']"
      validId="password"
      type="password"
      placeholder="Password"
    />
    <h3 class="">再次輸入</h3>
    <Input
      v-model.trim="updateData.confirmPassword"
      :vaildField="['required', 'password']"
      validId="confirmPassword"
      type="password"
      placeholder="Password"
    />
    <button @click="resetPassword" class="button w-[373px] h-[54px] mt-6">
      重設密碼
    </button>
  </div>
</template>
