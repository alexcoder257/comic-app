<template>
  <div class="sample-container">
    <div class="title">
      {{ props.title }}
    </div>
    <div class="list-commic">
      <div v-for="item in listCommic" :key="item.id" class="item">
        <img :src="item.imgURL" alt="img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
  }>(),
  {
    title: "Default title",
  }
);
const listCommic = [
  {
    id: "1",
    imgURL: "/assets/images/sliderBackground1.jpg",
  },
  {
    id: "2",
    imgURL: "/assets/images/sliderBackground1.jpg",
  },
  {
    id: "3",
    imgURL: "/assets/images/sliderBackground1.jpg",
  },
  {
    id: "4",
    imgURL: "/assets/images/sliderBackground1.jpg",
  },
];
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_sample.scss";
</style>