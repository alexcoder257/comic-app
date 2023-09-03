<template>
  <Teleport to="body">
    <div class="body-container">
      <header-component />
      <main>
        <slot></slot>
      </main>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
</script>

<style scoped>
</style>
