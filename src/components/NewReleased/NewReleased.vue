<template>
  <div class="release-container">
    <div class="title">NEW RELEASED COMIC</div>
    <div class="commic-container">
      <div
        v-for="item in listComic"
        :key="item.id"
        class="commic-item"
        @click="handleViewDetail(item)"
      >
        <div class="picture">
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
  </div>
</template>

<script setup lang="ts">
// import Star from "@/assets/icons/Star.vue";
import Eyes from "@/assets/icons/Eyes.vue";
import { stringify } from "qs";
import { computed, onMounted, ref } from "vue";
import { STATUS } from "@/constants/ComicConstants";
import { getNewComic } from "@/service/apiComic";
import { useLoadingStore } from "@/store/loading";
import store from "@/store";
import { formatNumber } from "@/utils/format";
import { useRouter } from "vue-router";

const listComic = ref();

const { startProgress, stopProgress } = useLoadingStore(store);

const route = useRouter();

const pagination = ref({
  page: 1,
  status: STATUS.ALL,
});

const queryString = computed(() =>
  stringify(
    {
      ...pagination.value,
    },
    {
      arrayFormat: "comma",
    }
  )
);

const fetchData = async () => {
  startProgress();
  const res = await getNewComic(queryString.value);
  stopProgress();
  listComic.value = res.comics;
};

onMounted(() => {
  fetchData();
});

const handleViewDetail = (item: any) => {
  route.push({ name: "DetailPage", params: { id: item.id } });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_new-released.scss";
</style>