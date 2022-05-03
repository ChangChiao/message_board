<script setup>
import { reactive } from 'vue';
import UploadFile from '../components/UploadFile.vue';
import { postAPIData } from '../utils/api/ajax.js';
const initialState = {
  content: '',
  user: '626f7dfb64558c57ad26753c',
  cover: ''
};

const editContent = reactive({
  ...initialState
});

const imageError = reactive({
  isShow: false,
  errorText: ''
});

const addPost = async () => {
  try {
    const result = await postAPIData('/', { ...editContent });
    reset();
    console.log('result', result);
  } catch (error) {
    console.log('error', error);
  }
};

const reset = () => {
  imageError.isShow = false;
  imageError.errorText = '';
  Object.assign(editContent, initialState);
};

const setError = (text) => {
  imageError.isShow = true;
  imageError.errorText = text;
};

const setFile = (url) => {
  console.log('setFile', url);
  editContent.cover = url;
};
</script>
<template>
  <h1 class="title mb-4">張貼動態</h1>
  <div class="box-rounded p-8">
    <h3 class="pb-2">貼文內容</h3>
    <textarea
      v-model="editContent.content"
      class="border-2 border-black w-full p-2"
      placeholder="輸入您的貼文內容"
      name=""
      id=""
      cols="30"
      rows="10"
    ></textarea>
    <UploadFile @setError="setError" @setFile="setFile" />
    <div
      v-if="editContent.cover"
      class="my-4 border-2 rounded-md overflow-hidden w-full h-[157px]"
    >
      <img :src="editContent.cover" />
    </div>
    <p v-if="imageError.isShow" class="text-red w-full">
      {{ imageError.errorText }}
    </p>
    <!-- <p class="text-red w-full">圖片格式錯誤，僅限 JPG、PNG 圖片</p> -->
    <button
      @click="addPost"
      class="w-[323px] h-[54px] rounded-md border-2 relative -translate-x-1/2 left-1/2 my-8 mx-auto bg-[#A8B0B9]"
    >
      送出貼文
    </button>
  </div>
</template>
