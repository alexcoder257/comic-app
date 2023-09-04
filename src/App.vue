<template>
  <component :is="currentLayout">
    <router-view />
  </component>
  <LoadingSpinner v-show="progressFlag" />
</template>

<script setup lang="ts">
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import SimpleLayout from "@/views/layouts/SimpleLayout.vue";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useLoadingStore } from "@/store/loading";
import LoadingSpinner from "@/components/Loading/LoadingSpinner.vue";
import store from "@/store";

const layouts = {
  default: DefaultLayout,
  simple: SimpleLayout,
};

const { inProgressApiCount, progressFlag } = storeToRefs(
  useLoadingStore(store)
);

const route = useRoute();

watch(
  () => route,
  () => {
    inProgressApiCount.value = 0;
  }
);

const currentLayout = computed(
  () => layouts[(route.meta["layout"] as string) ?? "default"]
);
</script>

<style scoped></style>
