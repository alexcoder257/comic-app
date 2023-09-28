<template>
  <div v-if="comicData" class="read-container" @scroll="handleScroll">
    <div v-if="!isScroll" class="nav-bar-top">
      <div class="icon-home" @click="handleRedirect">
        <home :width="'24'" :color="'#fff'" />
      </div>
      <div class="icon-back" @click="handleBackChapter">
        <arrow-left :width="'24'" :color="'#fff'" />
      </div>
      <div class="chapter">
        <input
          type="text"
          placeholder="Chapter ..."
          disabled
          :value="chapterName"
        />
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
        <arrow-right :width="'24'" :color="'#fff'" />
      </div>
    </div>
    <div class="content" v-if="isLoaded">
      <div class="img-container">
        <img
          v-for="(item, idx) in comicData.images"
          :key="idx"
          :src="item.src"
          @error="replaceByDefault"
          alt="img"
        />
      </div>
    </div>
    <div class="default" v-else></div>
    <div v-if="isScroll" class="nav-bar-bottom">
      <div class="icon-home" @click="handleRedirect">
        <home :width="'24'" :color="'#fff'" />
      </div>
      <div class="icon-back" @click="handleBackChapter">
        <arrow-left :width="'24'" :color="'#fff'" />
      </div>
      <div class="chapter">
        <input type="text" placeholder="Chapter ..." :value="chapterName" />
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
        <arrow-right :width="'24'" :color="'#fff'" />
      </div>
    </div>
    <div class="scroll-top" @click="handleScrollTop">
      <scroll-top :width="'32'" :color="'#e6052e'" />
    </div>
  </div>
  <LoadingSpinner v-show="true" />
</template>

<script lang="ts" setup>
import LoadingSpinner from "@/components/Loading/LoadingSpinner.vue";
import Home from "@/assets/icons/Home.vue";
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import ArrowRight from "@/assets/icons/ArrowRight.vue";
import ArrowDown from "@/assets/icons/ArrowDown.vue";
import ArrowUp from "@/assets/icons/ArrowUp.vue";
import ScrollTop from "@/assets/icons/ScrollTop.vue";
import { useToggle } from "@/hooks/useToggle";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSingleChapter, getDetailCommic } from "@/service/apiComic";
import { historyAddComic, historyDeleteComic } from "../../utils/indexedDb";
import cardbg from "@/assets/images/cardbg.jpg";

const { isShow, toggle, close } = useToggle();
const router = useRouter();
const route = useRoute();
const isScroll = ref(false);
const id = ref(route.params.id);
const chapterId = ref(route.params.chapterId);
const comicData = ref();
const chapterName = ref("Chương 1");
const isLoaded = ref(false);
const thumbnail = ref();

const replaceByDefault = (e) => {
  e.target.src = cardbg;
};

const fetchData = async () => {
  try {
    const res = await getSingleChapter({
      comicId: id.value,
      chapterId: chapterId.value,
    });
    comicData.value = res;
    chapterName.value = res.chapter_name;
  } catch (error) {
    throw new Error();
  } finally {
    isLoaded.value = true;
  }
};

const fetchDetail = async () => {
  const res = await getDetailCommic(id.value);
  thumbnail.value = res.thumbnail;
};

onMounted(() => {
  fetchData();
  fetchDetail();
  window.addEventListener("scroll", handleScroll);
});

const handleRedirect = () => {
  router.push({ name: "HomePage" });
};

const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleScroll = () => {
  let lastScrollTop = 0;
  const scrollTop = window.scrollY;
  if (scrollTop > lastScrollTop) {
    isScroll.value = false;
  } else {
    isScroll.value = true;
  }
  lastScrollTop = scrollTop;
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
  isLoaded.value = false;
  chapterId.value = chapter.id;
  handleScrollTop();
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
  isLoaded.value = false;
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
  isLoaded.value = false;
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
