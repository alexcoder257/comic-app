<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      :fill="props.color"
      d="m5.825 22l2.325-7.6L2 10h7.6L12 2l2.4 8H22l-6.15 4.4l2.325 7.6L12 17.3L5.825 22Z"
    />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color: string;
    width: string;
  }>(),
  {
    color: "red",
    width: "32",
  }
);
</script>

<style lang="scss" scoped>
</style>