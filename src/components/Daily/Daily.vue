<template>
  <div class="daily-content">
    <div class="title">DAILY UPDATE SCHEDULE MANGA</div>
    <div class="navbar">
      <div class="nav-item active">Sunday</div>
      <div class="nav-item">Monday</div>
      <div class="nav-item">Tuesday</div>
      <div class="nav-item">Wednesday</div>
      <div class="nav-item">Thursday</div>
      <div class="nav-item">Friday</div>
      <div class="nav-item">Saturday</div>
    </div>
    <div class="commic-container">
      <div v-for="item in mockData" :key="item.id" class="commic-item">
        <div class="avatar">
          <img :src="item.imgURL" alt="img" />
        </div>
        <div class="name">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="footer-btn">Load more updates</div>
  </div>
</template>

<script setup lang="ts">
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
@import "@/assets/styles/components/_daily.scss";
</style>