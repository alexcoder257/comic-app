<template>
  <div class="popular-container">
    <div class="header">
      <div class="title">EASY READ COMIC ANYWHERE AND ANYTIME</div>
      <div class="picture">
        <img :src="laptop" alt="img" />
        <img :src="iphone" alt="img" />
      </div>
    </div>
    <div class="content">
      <div class="title">TOP 8 POPULAR COMIC</div>
      <div class="commic-container">
        <div
          v-for="(item, idx) in topComic"
          :key="item.id"
          class="commic-item"
          @click="handleChooseComic(item)"
        >
          <div class="rank">{{ idx + 1 }}</div>
          <div class="avatar">
            <v-lazy-image
              :src="item.thumbnail"
              @error="replaceByDefault(idx)"
            />
          </div>
          <div class="name">
            {{ item.title }}
          </div>
          <div class="author">
            <div class="icon">
              <heart :width="'14'" :color="'#fff'" />
            </div>
            <p>
              {{ formatNumber(item.followers) }}
            </p>
          </div>
          <div class="view">
            <div class="icon">
              <eyes :width="'14'" :color="'#fff'" />
            </div>
            <p>{{ formatNumber(item.total_views) }} Read times</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VLazyImage from "v-lazy-image";
import Eyes from "@/assets/icons/Eyes.vue";
import { stringify } from "qs";
// import { useLoadingStore } from "@/store/loading";
// import store from "@/store";
import { formatNumber } from "@/utils/format";
import { STATUS } from "@/constants/ComicConstants";
import { computed, onMounted, ref, watch } from "vue";
import { getTopFollow } from "@/service/apiComic";
import Heart from "@/assets/icons/Heart.vue";
import { useRouter } from "vue-router";
import laptop from "@/assets/images/laptop.png";
import iphone from "@/assets/images/iphone.png";
import cardbg from "@/assets/images/cardbg.jpg";
// const { startProgress, stopProgress } = useLoadingStore(store);

const router = useRouter();

const topComic = ref();

const pagination = ref({
  page: 1,
  status: STATUS.ALL,
});

const replaceByDefault = (idx) => {
  topComic.value[idx].thumbnail = cardbg;
};

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

// const isVisible = ref(false);
// const handleIntersection = () => {
//   const element = document.querySelectorAll(".popular-container");
//   const observer = new IntersectionObserver(
//     (entries) => {
//       isVisible.value = entries[0].isIntersecting;
//       if (entries[0].isIntersecting) observer.unobserve(entries[0].target);
//     },
//     { threshold: 0.1, rootMargin: "300px" }
//   );
//   element.forEach((item) => observer.observe(item));
// };

const fetchData = async () => {
  // startProgress();
  const res = await getTopFollow(queryString.value);
  // stopProgress();
  topComic.value = res.comics.slice(0, 8);
};
// watch(
//   () => isVisible.value,
//   () => {
//     fetchData();
//   }
// );

onMounted(() => {
  fetchData();
  // handleIntersection();
});

const handleChooseComic = (item) => {
  router.push({ name: "DetailPage", params: { id: item.id } });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_popular.scss";
</style>
