<template>
  <div v-if="genres" class="category-container">
    <div id="list-genre" class="content active">
      <div class="title">EXPLORE BY INTEREST</div>
      <div class="bottom-container">
        <div
          v-for="item in genres"
          class="item"
          :key="item.id"
          :style="`background-image: url(${sliderBackground1})`"
          @click="handleChooseGenre(item)"
        >
          <div class="name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="footer-btn" @click="handleShowGenre">Load more genres</div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { getAllGenres } from "@/service/apiComic";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useGenreStore } from "@/store/genre";
import sliderBackground1 from "@/assets/images/sliderBackground1.jpg";

const { setGenreName } = useGenreStore(store);

const router = useRouter();

const genres = ref();
const fetchData = async () => {
  const res = await getAllGenres();
  genres.value = res.slice().reverse();
};

onMounted(() => {
  fetchData();
});
const handleScrollTop = () => {
  const element = document.querySelector(".category-container");
  element?.scrollIntoView();
};
const handleShowGenre = () => {
  const element = document.getElementById("list-genre");
  element?.classList.toggle("active");
  handleScrollTop();
};

const handleChooseGenre = (item) => {
  setGenreName(item.name);
  router.push({
    name: "GenrePage",
    params: { genreId: item.id, genreName: item.name },
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_category.scss";
</style>
