<template>
  <div class="category-container">
    <div id="list-genre" class="content active">
      <div class="title">EXPLORE BY INTEREST</div>
      <div class="bottom-container">
        <div
          v-for="item in genres"
          :key="item.id"
          class="item"
          :style="`background-image: url(/assets/images/sliderBackground1.jpg)`"
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
    <div class="footer-btn" @click="handleShowGenre">Load more genres</div>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@/store/loading";
import store from "@/store";
import { getAllGenres } from "@/service/apiComic";
import { onMounted, ref } from "vue";

const { startProgress, stopProgress } = useLoadingStore(store);

const genres = ref();
const fetchData = async () => {
  startProgress();
  const res = await getAllGenres();
  stopProgress();
  genres.value = res.slice().reverse();
};

onMounted(() => {
  fetchData();
});

const handleShowGenre = () => {
  const element = document.getElementById("list-genre");
  element?.classList.toggle("active");
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_category.scss";
</style>
