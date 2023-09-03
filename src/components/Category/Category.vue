<template>
  <div class="category-container">
    <div class="title">EXPLORE BY INTEREST</div>
    <div class="top-container">
      <div
        v-for="item in categories[0]"
        :key="item.id"
        class="item"
        :style="`background-image: url(${item.background})`"
      >
        <div class="name">
          {{ item.name }}
        </div>
        <div class="description">
          {{ item.description }}
        </div>
      </div>
    </div>
    <div class="bottom-container">
      <div
        v-for="item in categories[1]"
        :key="item.id"
        class="item"
        :style="`background-image: url(${item.background})`"
      >
        <div class="name">
          {{ item.name }}
        </div>
        <div class="description">
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const categories = [
  [
    {
      id: "1",
      name: "DRAMA ROMANCE",
      description: "Enjoy the drama feel the sensation",
      background: "/assets/images/sliderBackground1.jpg",
    },
    {
      id: "2",
      name: "ACTION-ADVENTURE",
      description: "Feel the tension during the fight",
      background: "/assets/images/sliderBackground1.jpg",
    },
    {
      id: "3",
      name: "MARTIAL ARTS",
      description: "Discover wonders during your adventure",
      background: "/assets/images/sliderBackground1.jpg",
    },
    {
      id: "4",
      name: "SPORTS",
      description:
        "Focuses on stories involving sports and other athletic and competitive",
      background: "/assets/images/sliderBackground1.jpg",
    },
  ],
  [
    {
      id: "5",
      name: "COMEDY",
      description: "Immerse, Imagine, and Inspire",
      background: "/assets/images/sliderBackground1.jpg",
    },
    {
      id: "6",
      name: "HOROR",
      description: "Enjoy the feel of fear and scare of Manga",
      background: "/assets/images/sliderBackground1.jpg",
    },
    {
      id: "7",
      name: "FAMILY",
      description: "Feel the harm about family Manga",
      background: "/assets/images/sliderBackground1.jpg",
    },
    {
      id: "8",
      name: "SEE ALL GENRES MANGA",
      description: "",
      background: "/assets/images/sliderBackground1.jpg",
    },
  ],
];
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_category.scss";
</style>