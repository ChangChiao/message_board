<script setup>
import { postFormData } from '../utils/api/ajax.js';
const getImgurToken = async () => {
  // eslint-disable-next-line camelcase
  const { access_token } = await fetch('https://api.imgur.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      refresh_token: process.env.VUE_APP_IMGUR_REFRESH_TOKEN,
      client_id: process.env.VUE_APP_IMGUR_CLINETID,
      client_secret: process.env.VUE_APP_IMGUR_CLINET_SECRET,
      grant_type: 'refresh_token'
    })
  }).then((res) => res.json());
  localStorage.setItem('access_token', access_token);
};

const errorList = {
  large: '圖片檔案過大，僅限 1mb 以下檔案',
  fileName: '圖片格式錯誤，僅限 JPG、PNG 圖片'
};
const imgType = ['jpg', 'jpeg', 'png'];
// eslint-disable-next-line no-undef
const emit = defineEmits(['setFile', 'setError']);
const uploadImage = (event) => {
  const file = event.target.files[0];
  if (imgType.includes(file.type)) {
    emit('setError', errorList.fileName);
    return;
  }
  if (file.size > 1024 * 1024) {
    emit('setError', errorList.large);
    return;
  }
  sendImgToImgur(file);
  // emit('setFile', file);
};

const sendImgToImgur = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('type', 'file');
  // formData.append('album', 'RLtC2t7');
  try {
    const result = await postFormData(formData);
    const { link } = result.data;
    console.log('result', result);
    console.log('link', link);
    if (result.status === 200) {
      emit('setFile', link);
    }
  } catch (error) {
    const { status } = error.response;
    console.log(`error--${status}`, 'error');
    if (status === 403) {
      getImgurToken();
    }
  }
};
</script>

<template>
  <label
    for="fileUpload"
    class="mt-5 cursor-pointer block w-[128px] h-[32px] leading-7 bg-black text-white text-center"
  >
    上傳圖片
  </label>
  <input @change="uploadImage" class="hidden" type="file" id="fileUpload" />
</template>
