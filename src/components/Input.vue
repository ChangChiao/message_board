<script setup>
import { defineProps, reactive, watch, ref, toRefs, onMounted } from 'vue';
import regex from '../utils/valid/regex';
import error from '../utils/valid/error';
import { storeToRefs } from 'pinia';
import { useValidateStore } from '@/store';
const props = defineProps({
  validId: {
    type: String,
    required: true,
  },
  inputValue: null,
  vaildField: {
    type: Array,
    required: true,
  },
  type: {
    type: Number,
    default: 'text',
  },
});
const validateStore = useValidateStore();
const { validateList, errorFlag } = storeToRefs(validateStore);
const showError = ref(false);
const { validId, inputValue, vaildField } = toRefs(props);
const vaildDate = () => {
  for (let vaild of vaildField.value) {
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
  <div class="border-2 p-2">
    <input :value="inputValue" class="text-gray-400" placeholder="暱稱" />
    <p v-if="showError" class="text-red-700">{{ error[validId] }}</p>
  </div>
</template>
