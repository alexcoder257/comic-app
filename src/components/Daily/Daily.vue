<template>
  <div class="daily-content">
    <div id="list-filtered" class="content active">
      <div class="title">DAILY UPDATE SCHEDULE COMIC</div>
      <div class="navbar">
        <div
          v-for="item in filterList"
          :key="item.id"
          :class="`nav-item ${item.id === activeTab ? 'active' : ''}`"
          @click="handleChangeTab(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="commic-container">
        <div
          v-for="item in listComic"
          :key="item.id"
          class="commic-item"
          @click="handleChooseComic(item)"
        >
          <div class="avatar">
            <v-lazy-image
              :src="item.thumbnail ? item.thumbnail : '/assets/images/cardbg'"
            />
          </div>
          <div class="name">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="footer-btn" @click="handleShowMore">Load more updates</div>
  </div>
</template>

<script setup lang="ts">
import VLazyImage from "v-lazy-image";
import { STATUS, TOP } from "@/constants/ComicConstants";
import { useLoadingStore } from "@/store/loading";
import { computed, onMounted, ref, watch } from "vue";
import store from "@/store";
import { stringify } from "qs";
import {
  getDailyComic,
  getMonthlyComic,
  getTopAllComic,
  getTopChapter,
  getTopComment,
  getTopFollow,
  getWeeklyComic,
} from "@/service/apiComic";
import { useRouter } from "vue-router";

const filterList = [
  {
    id: 1,
    name: "Top All",
  },
  {
    id: 2,
    name: "Top Daily",
  },
  {
    id: 3,
    name: "Top Weekly",
  },
  {
    id: 4,
    name: "Top Monthly",
  },
  {
    id: 5,
    name: "Top Follow",
  },
  {
    id: 6,
    name: "Top Comment",
  },
  {
    id: 7,
    name: "Top Chapter",
  },
];

const { startProgress, stopProgress } = useLoadingStore(store);
const router = useRouter();

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

const activeTab = ref(1);
const activeName = computed(
  () => filterList.find((item) => item.id === activeTab.value)?.name
);

const handleChangeTab = (id) => {
  activeTab.value = id;
};

const fetchData = async () => {
  switch (activeName.value) {
    case TOP.ALL:
      startProgress();
      const res1 = await getTopAllComic(queryString.value);
      stopProgress();
      listComic.value = res1.comics;
      break;
    case TOP.DAILY:
      startProgress();
      const res2 = await getDailyComic(queryString.value);
      stopProgress();
      listComic.value = res2.comics;
      break;
    case TOP.WEEKLY:
      startProgress();
      const res3 = await getWeeklyComic(queryString.value);
      stopProgress();
      listComic.value = res3.comics;
      break;
    case TOP.MONTHLY:
      startProgress();
      const res4 = await getMonthlyComic(queryString.value);
      stopProgress();
      listComic.value = res4.comics;
      break;
    case TOP.CHAPTER:
      startProgress();
      const res5 = await getTopChapter(queryString.value);
      stopProgress();
      listComic.value = res5.comics;
      break;
    case TOP.FOLLOW:
      startProgress();
      const res6 = await getTopFollow(queryString.value);
      stopProgress();
      listComic.value = res6.comics;
      break;
    case TOP.COMMENT:
      startProgress();
      const res7 = await getTopComment(queryString.value);
      stopProgress();
      listComic.value = res7.comics;
      break;
    default:
      break;
  }
};

watch(
  () => activeTab.value,
  () => {
    fetchData();
  }
);

onMounted(() => {
  fetchData();
});

const handleScrollTop = () => {
  const element = document.querySelector(".daily-content");
  element?.scrollIntoView();
};

const handleShowMore = () => {
  const element = document.getElementById("list-filtered");
  element?.classList.toggle("active");
  handleScrollTop();
};

const handleChooseComic = (item) => {
  router.push({ name: "DetailPage", params: { id: item.id } });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_daily.scss";
</style>
