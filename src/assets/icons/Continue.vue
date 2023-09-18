<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      :fill="props.color"
      d="M10 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.501-.865l19 11a1 1 0 0 1 0 1.73l-19 11A.998.998 0 0 1 10 28zm1-21.266v18.532L27 16zM4 4h2v24H4z"
    />
  </svg>
</template>

<script lang="ts" setup>
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