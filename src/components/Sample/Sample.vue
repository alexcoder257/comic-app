<template>
  <div class="sample-container">
    <div class="title">
      {{ title }}
    </div>
    <div class="list-commic">
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
          delay: 8000,
          disableOnInteraction: false,
        }"
        :navigation="true"
        :modules="modules"
      >
        <swiper-slide
          v-for="item in listComic"
          :key="item.id"
          class="item"
          @click="handleChooseComic(item)"
        >
          <div class="picture">
            <img
              :src="item.thumbnail"
              loading="lazy"
              alt="picture"
              @error="replaceByDefault"
            />
          </div>
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
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
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
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import cardbg from "@/assets/images/cardbg.jpg";

export default {
  components: { Eyes, Heart, Swiper, SwiperSlide },
  props: {
    title: String,
  },
  setup(props) {
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
    const replaceByDefault = (e) => {
      e.target.src = cardbg;
    };

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

    return {
      replaceByDefault,
      listComic,
      formatNumber,
      handleChooseComic,
      modules: [Pagination, Navigation],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_sample.scss";
.list-commic ::v-deep(.swiper-button-next) {
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
.list-commic ::v-deep(.swiper-button-prev) {
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
