<script setup>
import UploadFile from '../components/UploadFile.vue';
</script>
<template>
  <div>
    <h3>暱稱</h3>
    <img class="avatar w-[107px] h-[107px]" src="" alt="" />
    <UploadFile />
    <h3>性別</h3>
    <label for="male">男性 </label>
    <input id="male" type="checkbox" />
    <label for="female">女性</label>
    <input id="female" type="checkbox" />
    <p>1.圖片寬高比必需為 1:1，請重新輸入</p>
    <p>2. 解析度寬度至少 300像素以上，請重新輸入</p>
    <button class="button bg-yellow text-black">送出更新</button>
  </div>
</template>
