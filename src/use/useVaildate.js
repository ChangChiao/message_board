import { reactive } from 'vue';
export default function useVaildate(data) {
  const vaildList = reactive({ ...data });
  const vaild = () => {};
  const reset = () => {};
  return { vaild, reset };
}
