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
          <v-lazy-image
            :src="item.thumbnail ? item.thumbnail : '/assets/images/cardbg'"
          />
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
    <pagination v-model:modelValue="currentPage" :total-pages="totalPage" />
    <footer-component />
  </div>
</template>

<script setup lang="ts">
import VLazyImage from "v-lazy-image";
import Pagination from "@/components/Pagination/Pagination.vue";
import Eyes from "@/assets/icons/Eyes.vue";
import { onMounted, ref, watch } from "vue";
import { getComicByGenre } from "@/service/apiComic";
import { useLoadingStore } from "@/store/loading";
import store from "@/store";
import { formatNumber } from "@/utils/format";
import { useRoute, useRouter } from "vue-router";
import FooterComponent from "@/components/FooterComponent/FooterComponent.vue";

const route = useRoute();
const router = useRouter();
const totalPage = ref(100);
const currentPage = ref(1);
const { startProgress, stopProgress } = useLoadingStore(store);

const listComic = ref();
const genreId = ref(route.params.genreId);
const genreName = ref(route.params.genreName);

const fetchData = async () => {
  startProgress();
  const res = await getComicByGenre(
    `${genreId.value}?page=${currentPage.value}`
  );
  handleScrollTop();
  stopProgress();
  listComic.value = res.comics;
  totalPage.value = res.total_pages;
};

watch(
  () => [route.params.genreId, route.params.genreName, currentPage.value],
  () => {
    genreId.value = route.params.genreId;
    genreName.value = route.params.genreName;
    fetchData();
  }
);
const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
onMounted(async () => {
  fetchData();
});

const handleViewDetail = (item: any) => {
  router.push({ name: "DetailPage", params: { id: item.id } });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/page/_genre-page.scss";
</style>
