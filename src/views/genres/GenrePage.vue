<template>
  <div v-if="listComic" class="genre-container">
    <div class="title">GENRES: {{ getGenreName }}</div>
    <div class="commic-container">
      <div
        v-for="(item, idx) in listComic"
        :key="item.id"
        class="commic-item"
        @click="handleViewDetail(item)"
      >
        <div class="thumbnail">
          <v-lazy-image :src="item.thumbnail" @error="replaceByDefault(idx)" />
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
import { useGenreStore } from "@/store/genre";
import store from "@/store";
import { formatNumber } from "@/utils/format";
import { useRoute, useRouter } from "vue-router";
import FooterComponent from "@/components/FooterComponent/FooterComponent.vue";
import { storeToRefs } from "pinia";
import cardbg from "@/assets/images/cardbg.jpg";

const route = useRoute();
const router = useRouter();
const totalPage = ref(100);
const currentPage = ref(1);
const { startProgress, stopProgress } = useLoadingStore(store);
const replaceByDefault = (idx) => {
  listComic.value[idx].thumbnail = cardbg;
};

const { getGenreName } = storeToRefs(useGenreStore(store));

const listComic = ref();
const genreId = ref(route.params.genreId);
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
  () => [genreId.value, currentPage.value],
  () => {
    fetchData();
  },
  {
    deep: true,
  }
);
const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
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
