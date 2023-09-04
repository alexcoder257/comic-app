import { ref } from "vue";

export function useToggle() {
  const isShow = ref(false);

  const toggle = () => {
    isShow.value = !isShow.value;
  };

  const close = () => {
    isShow.value = false;
  };

  const open = () => {
    isShow.value = true;
  };

  return { isShow, close, open, toggle };
}
