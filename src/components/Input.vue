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
  modelValue: null,
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
  },
  maxLength: {
    type: Number,
    default: 30
  }
});
const validateStore = useValidateStore();
const { validateList, errorFlag } = storeToRefs(validateStore);
const vaildFail = ref(null);
const { validId, modelValue, vaildField } = toRefs(props);
const vaildDate = () => {
  for (const vaild of vaildField.value) {
    const rule = regex[vaild];
    if (!rule(modelValue.value)) {
      setError();
      vaildFail.value = vaild;
      return;
    }
  }
  vaildFail.value = null;
  validateStore.updateValidateList([]);
};

watch(modelValue, (newVal) => {
  vaildDate();
});

watch(errorFlag, (newVal) => {
  errorFlag.value && vaildDate();
});

const setError = () => {
  const temp = new Set([...validateList.value, validId.value]);
  validateStore.updateValidateList([...temp]);
};

// eslint-disable-next-line no-undef
const emit = defineEmits(['change']);

const handelChange = (event) => {
  emit('update:modelValue', event.target.value);
};

onMounted(() => {});
</script>

<template>
  <div class="border-2 my-2 w-[373px] h-[51px] flex items-center bg-white border-black p-4">
    <input :maxlength="maxLength" :value="modelValue" @input="handelChange" class="w-full h-7 text-gray-400" :placeholder="placeholder" :type="type" />
  </div>
  <p v-if="errorFlag" class="text-red text-left">{{ error[vaildFail] }}</p>
</template>
