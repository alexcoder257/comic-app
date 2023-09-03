<template>
  <div class="release-container">
    <div class="title">NEW RELEASED COMIC</div>
    <div class="commic-container">
      <div v-for="item in mockData" :key="item.id" class="commic-item">
        <div class="picture">
          <img :src="item.imgURL" alt="picture" />
        </div>
        <div class="name">{{ item.title }}</div>
        <div class="chapter">{{ item.chapter }}</div>
        <div class="rating">
          <div class="icon">
            <Star :width="'14'" :color="'#eded20'" />
          </div>
          <div class="rate">
            <p>{{ item.rating }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Star from "@/assets/icons/Star.vue";

const mockData = [
  {
    id: "1",
    imgURL: "/assets/images/sliderBackground1.jpg",
    title: "ONE PIECE",
    chapter: "Chapter 1079: The Emperor's",
    rating: "4.3/5.0",
  },
  {
    id: "2",
    imgURL: "/assets/images/sliderBackground1.jpg",
    title: "ONE PIECE",
    chapter: "Chapter 1079: The Emperor's",
    rating: "4.3/5.0",
  },
  {
    id: "3",
    imgURL: "/assets/images/sliderBackground1.jpg",
    title: "ONE PIECE",
    chapter: "Chapter 1079: The Emperor's",
    rating: "4.3/5.0",
  },
  {
    id: "4",
    imgURL: "/assets/images/sliderBackground1.jpg",
    title: "ONE PIECE",
    chapter: "Chapter 1079: The Emperor's",
    rating: "4.3/5.0",
  },
];
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_new-released.scss";
</style>