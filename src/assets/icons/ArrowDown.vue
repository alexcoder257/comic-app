<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    :height="props.height"
    viewBox="0 0 24 24"
  >
    <path
      :fill="props.color"
      d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
    />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color: string;
    width: string;
    height: string;
  }>(),
  {
    color: "red",
    width: "32",
    height: "32",
  }
);
</script>

<style></style>
