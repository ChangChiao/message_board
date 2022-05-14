<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import Send from '@/icons/Send.vue';
const inputBox = ref(null);

const emit = defineEmits(['sendMessage']);
const sendMessage = () => {
  const value = inputBox.value.innerText;
  if (value === '') return;
  if (value.length > 100) {
    console.log('輸入內容長度超過上限');
    return;
  }
  emit('sendMessage', value);
  inputBox.value.innerText = '';
};

onMounted(() => {
  const keyEvent = new KeyboardEvent('keyup', {
    bubbles: true
  });
  inputBox.value.dispatchEvent(keyEvent);
  inputBox.value.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
      console.log('doSomething');
    }
    console.log('content', e.target.innerText);
  });
});
</script>

<template>
  <div
    class="bg-slate-700 w-full p-2 fixed md:absolute bottom-0 flex justify-between items-center left-0"
  >
    <div
      class="bg-white min-h-[32px] max-h-36 flex items-center rounded-2xl w-11/12 break-all px-2 outline-none overflow-hidden"
      contenteditable="true"
      id="test"
      role="textbox"
      spellcheck="true"
      tabindex="0"
      ref="inputBox"
    ></div>
    <Send @click="sendMessage" class="text-white cursor-pointer" />
  </div>
</template>
