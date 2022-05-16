<script setup>
import { useToast } from 'vue-toastification';
import { reactive } from 'vue';
import UploadFile from '../components/UploadFile.vue';
import { patchAPIData } from '../utils/api/ajax.js';
import Input from '../components/Input.vue';

const toast = useToast();
const initialState = {
  userName: '',
  gender: 1,
  avatar: ''
};

const editContent = reactive({
  ...initialState
});

const imageError = reactive({
  isShow: false,
  errorText: ''
});

const setError = (text) => {
  imageError.isShow = true;
  imageError.errorText = text;
};

const reset = () => {
  imageError.isShow = false;
  imageError.errorText = '';
  Object.assign(editContent, initialState);
};

const setFile = (url) => {
  console.log('setFile', url);
  editContent.avatar = url;
};

const updateInfo = async () => {
  try {
    const result = await patchAPIData('/users/profile', { ...editContent });
    reset();
    const { status, user } = result;
    status === 'success' && localStorage.setItem('user', JSON.stringify(user));
    toast.success('修改成功');
  } catch (error) {
    console.log('error', error);
  }
};
</script>
<template>
  <div class="flex flex-col items-center">
    <img
      class="avatar w-[107px] h-[107px]"
      src="../assets/images/user_default.png"
      alt=""
    />
    <UploadFile @setError="setError" @setFile="setFile" />
    <div class="pt-2">
      <h3 class="">暱稱</h3>
      <Input />
    </div>
    <div class="w-full">
      <h3 class="">性別</h3>
      <div class="flex items-center">
        <input id="male" value="1" type="radio" v-model="editContent.gender" checked />
        <label class="pl-2 pr-4" for="male">男性 </label>
        <input id="female" value="0" type="radio" v-model="editContent.gender" />
        <label class="pl-2 pr-4" for="female">女性</label>
      </div>
    </div>
    <p v-if="imageError.isShow" class="text-red w-full">
      {{ imageError.errorText }}
    </p>
    <!-- <p class="text-red w-full">1.圖片寬高比必需為 1:1，請重新輸入</p>
    <p class="text-red w-full">2. 解析度寬度至少 300像素以上，請重新輸入</p> -->
    <button
      @click="updateInfo"
      class="button bg-yellow text-black w-[373px] h-[54px] mt-6"
    >
      送出更新
    </button>
  </div>
</template>
