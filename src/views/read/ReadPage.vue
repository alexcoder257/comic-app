<template>
  <div class="read-container">
    <div class="content" v-if="comicData">
      <div
        class="page-chapter"
        :index="idx"
        v-for="(item, idx) in comicData.images"
        :key="idx"
      >
        <img :src="item.src" @error="replaceByDefault" alt="img" />
      </div>
    </div>
    <div class="nav-bar-bottom">
      <div class="icon-home" @click="handleRedirect">
        <home :width="'24'" :color="'#fff'" />
      </div>
      <div class="icon-back" @click="handleBackChapter">
        <arrow-left :width="'32'" :color="'#fff'" />
      </div>
      <div class="chapter">
        <div class="chapter-des">
          {{ chapterName }} - Page: {{ currentPage }}/{{ page }}
        </div>
        <div class="icon">
          <arrow-up
            v-if="isShow"
            @click="toggle()"
            :width="'24'"
            :color="'#fff'"
          />
          <arrow-down
            v-if="!isShow"
            @click="toggle()"
            :width="'24'"
            :color="'#fff'"
          />
        </div>
        <div v-if="isShow" class="dropdown">
          <p
            v-for="chapter in comicData.chapters"
            :key="chapter.id"
            @click="handleChooseChapter(chapter)"
          >
            {{ chapter.name }}
          </p>
        </div>
      </div>
      <div class="icon-next" @click="handleNextChapter">
        <arrow-right :width="'32'" :color="'#fff'" />
      </div>
      <div class="scroll-mobile">
        <rocket
          v-if="currentPage > 3"
          :width="'24'"
          :color="'#fff'"
          @click="handleScrollTop"
        />
      </div>
    </div>
    <div v-if="currentPage > 3" class="scroll-top" @click="handleScrollTop">
      <rocket :width="'32'" :color="'#fff'" />
    </div>
  </div>
  <LoadingSpinner v-show="true" />
</template>

<script lang="ts" setup>
import Rocket from "@/assets/icons/Rocket.vue";
import LoadingSpinner from "@/components/Loading/LoadingSpinner.vue";
import Home from "@/assets/icons/Home.vue";
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import ArrowRight from "@/assets/icons/ArrowRight.vue";
import ArrowDown from "@/assets/icons/ArrowDown.vue";
import ArrowUp from "@/assets/icons/ArrowUp.vue";
import { useToggle } from "@/hooks/useToggle";
import { onBeforeMount, onMounted, ref, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSingleChapter, getDetailCommic } from "@/service/apiComic";
import { historyAddComic, historyDeleteComic } from "../../utils/indexedDb";
import cardbg from "@/assets/images/cardbg.jpg";

const { isShow, toggle, close } = useToggle();
const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);
const chapterId = ref(route.params.chapterId);
const comicData = ref();
const chapterName = ref("Chương 1");
const page = ref(0);
const thumbnail = ref();
const currentPage: any = ref(0);

const replaceByDefault = (e) => {
  e.target.src = cardbg;
};
const handleIntersection = async () => {
  await nextTick();
  const element = document.querySelectorAll(".page-chapter");
  const observer = new IntersectionObserver(
    (entries) => {
      currentPage.value = Number(entries[0].target.getAttribute("index")) + 1;
    },
    { threshold: 0.5 }
  );
  element.forEach((item) => observer.observe(item));
};

watch(
  () => comicData.value,
  () => {
    handleIntersection();
  },
  {
    deep: true,
  }
);

const fetchData = async () => {
  currentPage.value = 1;
  page.value = 1;
  try {
    const res = await getSingleChapter({
      comicId: id.value,
      chapterId: chapterId.value,
    });
    page.value = res.images.length;
    if (page.value === 0) {
      fetchData();
    }
    comicData.value = res;
    chapterName.value = res.chapter_name;
    handleScrollTop();
  } catch (error) {
    throw new Error();
  }
};

const fetchDetail = async () => {
  const res = await getDetailCommic(id.value);
  thumbnail.value = res.thumbnail;
};

onMounted(() => {
  fetchData();
  fetchDetail();
});

const handleRedirect = () => {
  router.push({ name: "HomePage" });
};

const handleScrollTop = () => {
  const element = document.querySelector(".read-container");
  element?.scrollIntoView();
  currentPage.value = 1;
};

watch(
  () => [chapterId.value],
  () => {
    fetchData();
  },
  {
    deep: true,
  }
);

const handleChooseChapter = (chapter) => {
  close();
  chapterName.value = chapter.name;
  chapterId.value = chapter.id;
  historyDeleteComic(id.value);
  historyAddComic({
    id: id.value,
    chapterId: chapter.id,
    thumbnail: thumbnail.value,
    title: comicData.value.comic_name,
    chapterName: chapter.name,
  });
};

const handleNextChapter = () => {
  close();
  if (comicData.value && chapterId.value) {
    const idx = comicData.value.chapters.findIndex(
      (item) => item.id == chapterId.value
    );
    if (idx !== 0) {
      chapterId.value = comicData.value.chapters[idx - 1].id;
    }
    let chapterName = comicData.value.chapters.find(
      (i) => i.id == chapterId.value
    ).name;
    historyDeleteComic(id.value);
    historyAddComic({
      id: id.value,
      chapterId: chapterId.value,
      thumbnail: thumbnail.value,
      title: comicData.value.comic_name,
      chapterName: chapterName,
    });
  }
};

const handleBackChapter = () => {
  close();
  if (comicData.value && chapterId.value) {
    const idx = comicData.value.chapters.findIndex(
      (item) => item.id == chapterId.value
    );
    if (idx !== comicData.value.chapters.length - 1) {
      chapterId.value = comicData.value.chapters[idx + 1].id;
    }
    let chapterName = comicData.value.chapters.find(
      (i) => i.id == chapterId.value
    ).name;
    historyDeleteComic(id.value);
    historyAddComic({
      id: id.value,
      chapterId: chapterId.value,
      thumbnail: thumbnail.value,
      title: comicData.value.comic_name,
      chapterName: chapterName,
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/page/_read-page.scss";
</style>
