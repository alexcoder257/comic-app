<template>
  <div class="genre-container">
    <div class="title">GENRES: {{ genreName }}</div>
    <div class="commic-container">
      <div
        v-for="item in listComic"
        :key="item.id"
        class="commic-item"
        @click="handleViewDetail(item)"
      >
        <div class="thumbnail">
          <img :src="item.thumbnail" alt="picture" />
        </div>
        <div class="name">{{ item.title }}</div>
        <div class="chapter">Cập nhật: {{ item.updated_at }}</div>
        <div class="rating">
          <div class="icon">
            <eyes :width="'14'" :color="'#2ecc71'" />
          </div>
          <div class="rate">
            <p>{{ formatNumber(item.total_views) }}</p>
          </div>
        </div>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script setup lang="ts">
// import Star from "@/assets/icons/Star.vue";
import Eyes from "@/assets/icons/Eyes.vue";
import { stringify } from "qs";
import { computed, onMounted, ref } from "vue";
import { STATUS } from "@/constants/ComicConstants";
import { getComicByGenre } from "@/service/apiComic";
import { useLoadingStore } from "@/store/loading";
import store from "@/store";
import { formatNumber } from "@/utils/format";
import { useRoute, useRouter } from "vue-router";
import FooterComponent from "@/components/FooterComponent/FooterComponent.vue";

const route = useRoute();
const router = useRouter();
const { startProgress, stopProgress } = useLoadingStore(store);

const listComic = ref();
const genreId = ref(route.params.genreId);
const genreName = ref(route.params.genreName);
const pagination = ref({
  page: 1,
  status: STATUS.ALL,
});

const fetchData = async () => {
  startProgress();
  const res = await getComicByGenre(genreId.value);
  stopProgress();
  listComic.value = res.comics;
};

onMounted(() => {
  fetchData();
});

const handleViewDetail = (item: any) => {
  router.push({ name: "DetailPage", params: { id: item.id } });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/page/_genre-page.scss";
</style>
