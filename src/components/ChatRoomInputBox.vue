<script setup>
import { useToast } from 'vue-toastification';
import Send from '@/icons/Send.vue';
import { ref, onMounted, defineEmits } from 'vue';
const inputBox = ref(null);
const toast = useToast();
const emit = defineEmits(['sendMessage', 'userTyping']);
const sendMessage = () => {
  let value = inputBox.value.innerText;
  value = value.replace(/\n/g, '');
  if (value.length === 0) {
    toast.error('請輸入內容再送出訊息');
    return;
  }
  if (value.length > 100) {
    toast.error('輸入內容長度超過上限');
    return;
  }
  emit('sendMessage', value);
  inputBox.value.innerText = '';
  inputBox.value.focus();
};

onMounted(() => {
  const keyEvent = new KeyboardEvent('keyup', {
    bubbles: true
  });
  inputBox.value.dispatchEvent(keyEvent);
  inputBox.value.addEventListener('keypress', (e) => {
    emit('userTyping', e.key);
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});
</script>

<template>
  <div
    class="bg-slate-700 w-full p-2 fixed lg:absolute bottom-0 flex justify-between items-center left-0"
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
