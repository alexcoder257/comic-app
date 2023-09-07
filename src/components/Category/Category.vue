<template>
  <div v-if="genres" class="category-container">
    <div id="list-genre" class="content active">
      <div class="title">EXPLORE BY INTEREST</div>
      <div class="bottom-container">
        <div
          v-for="item in genres"
          class="item"
          :key="item.id"
          :style="`background-image: url(/assets/images/sliderBackground1.jpg)`"
          @click="handleChooseGenre(item)"
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
import { useRouter } from "vue-router";

const { startProgress, stopProgress } = useLoadingStore(store);

const router = useRouter();

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

const handleChooseGenre = (item) => {
  router.push({
    name: "GenrePage",
    params: { genreId: item.id, genreName: item.name },
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_category.scss";
</style>
