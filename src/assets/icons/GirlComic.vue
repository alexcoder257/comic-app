<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    height="32"
    viewBox="0 0 14 14"
  >
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="7" cy="4" r="3.5" />
      <path d="M7 7.5v6M5 11h4" />
    </g>
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

<style scoped>
</style>