<template>
  <div :class="`slider-container before-${currentIndex}`">
    <div class="category">
      <p v-for="(category, idx) in mockData[currentIndex].category" :key="idx">
        {{ category }}
      </p>
    </div>
    <div class="title">
      <p>{{ mockData[currentIndex].title }}</p>
    </div>
    <div class="background">
      <img :src="mockData[currentIndex].image" alt="background" />
    </div>
    <div class="description">
      <div class="detail">
        {{ mockData[currentIndex].description }}
      </div>
      <div class="controler">
        <div class="read-btn">Read now</div>
        <div class="chapter">
          <div class="icon">
            <chapter :color="`#fff`" :width="`24`" />
          </div>
          <p>{{ mockData[currentIndex].chapter }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chapter from "@/assets/icons/Chapter.vue";
import { onUnmounted, ref } from "vue";
const currentIndex = ref(0);
let pollingInterval = 0;

const mockData = ref([
  {
    id: "1",
    category: ["Adventure", "Dark fantasy", "Martial arts"],
    title: "DEMON SLAYER:\nKIMETSU NO YAIBA",
    image: "/src/assets/images/slider1.png",
    imageBackground: "/src/assets/images/sliderBackground1.jpg",
    description:
      "Who strives to become a demon slayer after his family was slaughtered and his younger sister Nezuko turned into a demon",
    chapter: "Ch.205",
  },
  {
    id: "2",
    category: ["Action", "Adventure"],
    title: "ONE PIECE:\nHÀNH TRÌNH CỦA ACE",
    image: "/src/assets/images/slider2.png",
    imageBackground: "/src/assets/images/sliderBackground2.jpg",
    description:
      "Câu chuyện sẽ xoay quanh nhân vật Ace huyền thoại và niềm khao khát chinh phục kho báu One Piece cực kì mãnh liệt của anh.",
    chapter: "Ch.144",
  },
  {
    id: "3",
    category: ["Dark fantasy", "Martial arts"],
    title: "CỬU VĨ HỒ LY:\nDOUJINSHI NARUSASU",
    image: "/src/assets/images/slider3.png",
    imageBackground: "/src/assets/images/sliderBackground3.jpg",
    description:
      "Một số ngoại truyện về con trai của naruto do Hamtruyen.com và na3d.sohagame.vn hợp tác sản xuất",
    chapter: "Ch.153",
  },
]);

pollingInterval = setInterval(() => {
  if (currentIndex.value < mockData.value.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
}, 3000);

onUnmounted(() => {
  clearInterval(pollingInterval);
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_slider-component.scss";
</style>
