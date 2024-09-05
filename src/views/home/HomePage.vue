<template>
  <div class="container">
    <slider-component />
    <new-released />
    <category />
    <!-- <sample :title="'BOY COMICS'" />
    <sample :title="'GIRL COMICS'" /> -->
    <popular />
    <daily />
    <contact />
    <footer-component />
  </div>
</template>

<script setup lang="ts">
import SliderComponent from "@/components/Slider/SliderComponent.vue";
import NewReleased from "@/components/NewReleased/NewReleased.vue";
import Category from "@/components/Category/Category.vue";
import Sample from "@/components/Sample/Sample.vue";
import Popular from "@/components/Popular/Popular.vue";
import Daily from "@/components/Daily/Daily.vue";
import Contact from "@/components/Contact/Contact.vue";
import FooterComponent from "@/components/FooterComponent/FooterComponent.vue";
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  // display: flex;
  // flex-direction: column;
  // gap:32px
}
</style>
