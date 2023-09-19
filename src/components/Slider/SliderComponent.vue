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
        <div class="read-btn" @click="handleReadComic">Read now</div>
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
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
const currentIndex = ref(0);
let pollingInterval = 0;

const mockData = ref([
  {
    id: "thanh-guom-diet-quy",
    category: ["Drama", "Fantasy", "Historical", "Manga", "Shounen"],
    title: "THANH GƯƠM DIỆT QUỶ",
    image: "/assets/images/slider1.png",
    imageBackground: "/assets/images/sliderBackground1.jpg",
    description:
      "Kimetsu no Yaiba – Tanjirou là con cả của gia đình vừa mất cha. Một ngày nọ, Tanjirou đến thăm thị trấn khác để bán than, khi đêm về cậu ở nghỉ tại nhà người khác thay vì về nhà vì lời đồn thổi về ác quỷ luôn rình mò gần núi vào buổi tối. Khi cậu về nhà vào ngày hôm sau, bị kịch đang đợi chờ cậu…",
    chapter: "Gotouge Koyoharu",
  },
  {
    id: "one-piece",
    category: [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Shounen",
      "Supernatural",
    ],
    title: "ONE PIECE",
    image: "/assets/images/slider2.png",
    imageBackground: "/assets/images/sliderBackground2.jpg",
    description:
      "One Piece là câu truyện kể về Luffy và các thuyền viên của mình. Khi còn nhỏ, Luffy ước mơ trở thành Vua Hải Tặc. Cuộc sống của cậu bé thay đổi khi cậu vô tình có được sức mạnh có thể co dãn như cao su, nhưng đổi lại, cậu không bao giờ có thể bơi được nữa. Giờ đây, Luffy cùng những người bạn hải tặc của mình ra khơi tìm kiếm kho báu One Piece, kho báu vĩ đại nhất trên thế giới.",
    chapter: "Eiichiro Oda",
  },
  {
    id: "naruto",
    category: [
      "Action",
      "Adventure",
      "Supernatural",
      "Drama",
      "Comedy",
      "Shounen",
      "Fantasy",
    ],
    title: "NARUTO",
    image: "/assets/images/slider3.png",
    imageBackground: "/assets/images/sliderBackground3.jpg",
    description:
      "Bộ truyện kể về cuộc hành trình đầy gian khổ với vô vàn khó khăn, thử thách của Naruto từ khi còn là một cậu bé tới khi trở thành một trong những nhẫn giả vĩ đại nhất. Không chỉ mô tả về một thế giới nhẫn giả huyền bí, Naruto còn mang trong nó nhiều ý nghĩa nhân sinh sâu sắc về tình bạn, tình đồng đội, tình yêu, ước mơ và hi vọng.",
    chapter: "Kishimoto Masashi",
  },
]);

const router = useRouter();
const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  handleScrollTop();
});

const handleReadComic = () => {
  router.push({
    name: "DetailPage",
    params: { id: mockData.value[currentIndex.value].id },
  });
};

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
