<script setup>
const errorList = {
  large: '圖片檔案過大，僅限 1mb 以下檔案',
  fileName: '圖片格式錯誤，僅限 JPG、PNG 圖片',
}
const imgType = ['jpg',"jpeg", "png"]
const emit = defineEmits(['setFile', 'setError']);
const uploadImage = (event) => {
  const file = event.target.files[0];
  if(imgType.includes(file.type)){
    emit('setError', errorList.fileName)
    return
  }
  if(file.size > 1024 * 1024){
    emit('setError', errorList.large)
    return
  }
  setFile(file);
}
</script>

<template>
  <label
    for="fileUpload"
    class="mt-5 block w-[128px] h-[32px] leading-7 bg-black text-white text-center"
  >
    上傳圖片
  </label>
  <input @change="uploadImage" class="hidden" type="file" id="fileUpload" />
</template>
