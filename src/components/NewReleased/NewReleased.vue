<template>
  <div class="release-container">
    <div class="title">NEW RELEASED COMIC</div>
    <div class="comic-container">
      <swiper
        :lazy="true"
        :slides-per-view="6"
        :breakpoints="{
          1536: { slidesPerView: 7 },
          1280: { slidesPerView: 5 },
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          640: { slidesPerView: 2 },
          475: { slidesPerView: 2 },
          100: { slidesPerView: 1 },
        }"
        :space-between="24"
        :centeredSlides="false"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :navigation="true"
        :modules="modules"
      >
        <swiper-slide
          v-for="item in listComic"
          :key="item.id"
          class="comic-item"
          @click="handleViewDetail(item)"
        >
          <div class="picture">
            <img
              :src="item.thumbnail"
              @error="replaceByDefault"
              alt="picture"
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
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import Eyes from "@/assets/icons/Eyes.vue";
import { stringify } from "qs";
import { computed, onMounted, ref } from "vue";
import { STATUS } from "@/constants/ComicConstants";
import { getNewComic } from "@/service/apiComic";
import { formatNumber } from "@/utils/format";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import cardbg from "@/assets/images/cardbg.jpg";

export default {
  components: { Eyes, Swiper, SwiperSlide },
  setup() {
    const listComic = ref();

    const replaceByDefault = (e) => {
      e.target.src = cardbg;
    };

    const router = useRouter();

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
      // startProgress();
      const res = await getNewComic(queryString.value);
      // stopProgress();
      listComic.value = res.comics;
    };

    onMounted(() => {
      fetchData();
    });

    const handleViewDetail = (item: any) => {
      router.push({ name: "DetailPage", params: { id: item.id } });
    };

    return {
      replaceByDefault,
      listComic,
      formatNumber,
      handleViewDetail,
      modules: [Autoplay, Pagination, Navigation],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_new-released.scss";
.comic-container ::v-deep(.swiper-button-next) {
  --swiper-navigation-size: 16px;
  --swiper-navigation-top-offset: 35%;
  --swiper-navigation-sides-offset: 10px;
  font-weight: 700;
  color: #fff;
  background-color: #e6052e;
  padding: 20px;
  border-radius: 50%;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
}
.comic-container ::v-deep(.swiper-button-prev) {
  --swiper-navigation-size: 16px;
  --swiper-navigation-top-offset: 35%;
  --swiper-navigation-sides-offset: 10px;
  font-weight: 700;
  color: #fff;
  background-color: #e6052e;
  padding: 20px;
  border-radius: 50%;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
}
</style>
