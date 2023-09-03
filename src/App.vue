<template>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import SimpleLayout from "@/views/layouts/SimpleLayout.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const layouts = {
  default: DefaultLayout,
  simple: SimpleLayout,
};

const route = useRoute();

const currentLayout = computed(
  () => layouts[(route.meta["layout"] as string) ?? "default"]
);
</script>

<style scoped></style>
