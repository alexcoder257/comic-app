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
      <circle cx="4.5" cy="9.5" r="4" />
      <path d="M9 .5h4.5V5M7.33 6.67L13.5.5" />
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