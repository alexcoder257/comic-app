<template>
  <div class="sample-container">
    <div class="title">
      {{ props.title }}
    </div>
    <div class="list-commic">
      <div
        v-for="item in listComic"
        :key="item.id"
        class="item"
        @click="handleChooseComic(item)"
      >
        <img :src="item.thumbnail" alt="img" />
        <div class="title-comic">
          {{ item.title }}
        </div>
        <div class="social">
          <div class="view">
            <div class="icon">
              <eyes :width="'14'" :color="'#2ecc71'" />
            </div>
            <p>{{ formatNumber(item.total_views) }}</p>
          </div>
          <div class="followers">
            <div class="icon">
              <heart :width="'14'" :color="'#e6052e'" />
            </div>
            <p>{{ formatNumber(item.followers) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GENRE, STATUS } from "@/constants/ComicConstants";
import { computed, onMounted, ref } from "vue";
import { stringify } from "qs";
import { getBoyComic, getGirlComic } from "@/service/apiComic";
import { useLoadingStore } from "@/store/loading";
import store from "@/store";
import Eyes from "@/assets/icons/Eyes.vue";
import Heart from "@/assets/icons/Heart.vue";
import { formatNumber } from "@/utils/format";
import { useRouter } from "vue-router";

const props = withDefaults(
  defineProps<{
    title: string;
  }>(),
  {
    title: "Default title",
  }
);

const router = useRouter();

const { startProgress, stopProgress } = useLoadingStore(store);

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

const listComic = ref();

const pagination = ref({
  page: 1,
  status: STATUS.ALL,
});
const fetchData = async () => {
  switch (props.title) {
    case GENRE.BOY:
      startProgress();
      const genreBoyRes = await getBoyComic(queryString.value);
      stopProgress();
      listComic.value = genreBoyRes.comics;
      break;
    case GENRE.GIRL:
      startProgress();
      const genreGirlRes = await getGirlComic(queryString.value);
      stopProgress();
      listComic.value = genreGirlRes.comics;
      break;
    default:
      break;
  }
};

const handleChooseComic = (item) => {
  router.push({ name: "DetailPage", params: { id: item.id } });
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_sample.scss";
</style>
