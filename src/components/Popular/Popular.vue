<template>
  <div class="popular-container">
    <div class="header">
      <div class="title">EASY READ MANGA ANYWHERE AND ANYTIME</div>
      <div class="picture">
        <img src="/src/assets/images/laptop.png" alt="img" />
        <img src="/src/assets/images/iphone.png" alt="img" />
      </div>
    </div>
    <div class="content">
      <div class="title">TOP 8 POPULAR MANGA</div>
      <div class="commic-container">
        <div v-for="(item, idx) in mockData" :key="item.id" class="commic-item">
          <div class="rank">{{ idx + 1 }}</div>
          <div class="avatar">
            <img :src="item.imgURL" alt="img" />
          </div>
          <div class="name">
            {{ item.name }}
          </div>
          <div class="author">
            <div class="icon">
              <eyes :width="'14'" :color="'#fff'" />
            </div>
            <p>
              {{ item.author }}
            </p>
          </div>
          <div class="view">
            <div class="icon">
              <eyes :width="'14'" :color="'#fff'" />
            </div>
            <p>{{ item.view }} Read times</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Eyes from "@/assets/icons/Eyes.vue";
const mockData = [
  {
    id: "1",
    name: "CHAINSAW MAN",
    author: "TATSUKI FUJIMOTO",
    view: "946,341",
    imgURL: "/src/assets/images/sliderBackground1.jpg",
  },
  {
    id: "2",
    name: "ONE PIECE",
    author: "EIICHIRO ODA",
    view: "728,494",
    imgURL: "/src/assets/images/sliderBackground1.jpg",
  },
  {
    id: "3",
    name: "BORUTO NEXT GEN",
    author: "MASASHI KISHIMOTO",
    view: "703,708",
    imgURL: "/src/assets/images/sliderBackground1.jpg",
  },
  {
    id: "4",
    name: "JUJUTSU KAISEN",
    author: "GEGE AKUTAMI",
    view: "456,645",
    imgURL: "/src/assets/images/sliderBackground1.jpg",
  },
  {
    id: "5",
    name: "MY HERO ACADEMIA",
    author: "KOHEI HORIKOSHI",
    view: "437,345",
    imgURL: "/src/assets/images/sliderBackground1.jpg",
  },
  {
    id: "6",
    name: "SPY X FAMILY",
    author: "TATSUYA ENDO",
    view: "946,341",
    imgURL: "/src/assets/images/sliderBackground1.jpg",
  },
  {
    id: "7",
    name: "BLACK CLOVER",
    author: "YUKI TABATA",
    view: "330,637",
    imgURL: "/src/assets/images/sliderBackground1.jpg",
  },
  {
    id: "8",
    name: "DRAGON BALL SUPER",
    author: "AKIRA TORIYAMA",
    view: "311,722",
    imgURL: "/src/assets/images/sliderBackground1.jpg",
  },
];
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_popular.scss";
</style>