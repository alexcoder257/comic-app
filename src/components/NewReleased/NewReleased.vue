<template>
  <div class="release-container">
    <div class="title">NEW RELEASED COMIC</div>
    <div class="comic-container">
      <swiper
        :slides-per-view="6"
        :breakpoints="breakpoints"
        :space-between="24"
        :centered-slides="false"
        :autoplay="autoplayOptions"
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Eyes from "@/assets/icons/Eyes.vue";
import { stringify } from "qs";
import { getTopAllComic } from "@/service/apiComic";
import { formatNumber } from "@/utils/format";
import cardbg from "@/assets/images/cardbg.jpg";
import { STATUS } from "@/constants/ComicConstants";

export default {
  components: { Eyes, Swiper, SwiperSlide },
  setup() {
    const listComic = ref<any[]>([]);
    const router = useRouter();

    const replaceByDefault = (e: Event) => {
      const target = e.target as HTMLImageElement;
      target.src = cardbg;
    };

    const pagination = ref({
      page: 1,
      status: STATUS.COMPLETED,
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
      try {
        const res = await getTopAllComic(queryString.value);
        listComic.value = res.comics;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    const handleViewDetail = (item: any) => {
      router.push({ name: "DetailPage", params: { id: item.id } });
    };

    const breakpoints = {
      1536: { slidesPerView: 7 },
      1280: { slidesPerView: 5 },
      1024: { slidesPerView: 4 },
      768: { slidesPerView: 3 },
      640: { slidesPerView: 2 },
      475: { slidesPerView: 2 },
      100: { slidesPerView: 1 },
    };

    const autoplayOptions = {
      delay: 3000,
      disableOnInteraction: false,
    };

    return {
      listComic,
      replaceByDefault,
      formatNumber,
      handleViewDetail,
      breakpoints,
      autoplayOptions,
      modules: [Autoplay, Navigation], // Ensure this is correct
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_new-released.scss";

.comic-container ::v-deep(.swiper-button-next),
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
