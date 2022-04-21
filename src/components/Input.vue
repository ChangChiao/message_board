<script setup>
import { defineProps, watch, ref, toRefs, onMounted } from 'vue';
import regex from '../utils/valid/regex';
import error from '../utils/valid/error';
import { storeToRefs } from 'pinia';
import { useValidateStore } from '@/store';
const props = defineProps({
  validId: {
    type: String,
    required: true
  },
  inputValue: null,
  vaildField: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String
  }
});
const validateStore = useValidateStore();
const { validateList, errorFlag } = storeToRefs(validateStore);
const showError = ref(false);
const { validId, inputValue, vaildField } = toRefs(props);
const vaildDate = () => {
  for (const vaild of vaildField.value) {
    const rule = regex[vaild];
    if (rule(inputValue.value)) {
      setError();
      showError.value = true;
      break;
    }
  }
  validateStore.updateValidateList([]);
};

watch(inputValue, (newVal) => {
  vaildDate();
});

watch(errorFlag, (newVal) => {
  newVal && vaildDate();
});

const setError = () => {
  const temp = [...validateList.value];
  temp.push(validId.value);
  validateStore.updateValidateList(temp);
};

onMounted(() => {});
</script>

<template>
  <div class="border-2 my-2 w-[373px] h-[51px] flex items-center bg-white border-black p-4">
    <input :value="inputValue" class="w-full h-7 text-gray-400" :placeholder="placeholder" />
    <p v-if="showError" class="text-red">{{ error[validId] }}</p>
  </div>
</template>
