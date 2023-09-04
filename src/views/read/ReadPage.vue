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
          :value="chapterName ? chapterName : 'Chapter 99'"
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
        <div
          v-if="isShow"
          v-click-outside="handleClickOutside"
          class="dropdown"
        >
          <p
            v-for="chapter in comicData.chapters"
            :key="chapter.id"
            @click="handleChooseChapter(chapter.id)"
          >
            {{ chapter.name }}
          </p>
        </div>
      </div>
      <div class="icon-next" @click="handleNextChapter">
        <arrow-right :width="'24'" :color="'#fff'" />
      </div>
    </div>
    <div class="content">
      <img
        v-for="(item, idx) in comicData.images"
        :key="idx"
        :src="item.src"
        alt="img"
      />
    </div>
    <div v-if="isScroll" class="nav-bar-bottom">
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
          :value="chapterName ? chapterName : 'Chapter 99'"
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
        <div
          v-if="isShow"
          v-click-outside="handleClickOutside"
          class="dropdown"
        >
          <p
            v-for="chapter in comicData.chapters"
            :key="chapter.id"
            @click="handleChooseChapter(chapter.id)"
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
</template>

<script lang="ts" setup>
import Home from "@/assets/icons/Home.vue";
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import ArrowRight from "@/assets/icons/ArrowRight.vue";
import ArrowDown from "@/assets/icons/ArrowDown.vue";
import ArrowUp from "@/assets/icons/ArrowUp.vue";
import ScrollTop from "@/assets/icons/ScrollTop.vue";
import { useToggle } from "@/hooks/useToggle";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoadingStore } from "@/store/loading";
import store from "@/store";
import { getSingleChapter } from "@/service/apiComic";

const { isShow, toggle, close } = useToggle();
const { startProgress, stopProgress } = useLoadingStore(store);
const router = useRouter();
const route = useRoute();
const isScroll = ref(false);
const id = ref(route.params.id);
const chapterId = ref(route.params.chapterId);
const comicData = ref();
const chapterName = ref();

const handleClickOutside = () => {
  toggle();
};

const fetchData = async () => {
  startProgress();
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
    stopProgress();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  fetchData();
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
  () => chapterId.value,
  () => {
    fetchData();
  },
  {
    deep: true,
  }
);

const handleChooseChapter = (id) => {
  chapterId.value = id;
  fetchData();
  toggle();
};

const handleNextChapter = () => {
  if (comicData.value && chapterId.value) {
    const idx = comicData.value.chapters.findIndex(
      (item) => item.id == chapterId.value
    );
    if (idx !== 0) {
      chapterId.value = comicData.value.chapters[idx - 1].id;
      fetchData();
      handleScrollTop();
    }
  }
};

const handleBackChapter = () => {
  if (comicData.value && chapterId.value) {
    const idx = comicData.value.chapters.findIndex(
      (item) => item.id == chapterId.value
    );
    if (idx !== comicData.value.chapters.length - 1) {
      chapterId.value = comicData.value.chapters[idx + 1].id;
      fetchData();
      handleScrollTop();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/page/_read-page.scss";
</style>