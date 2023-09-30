<template>
  <div v-if="comicDetail" class="detail-container">
    <div class="content">
      <div class="image">
        <v-lazy-image :src="comicDetail.thumbnail" @error="replaceByDefault" />
      </div>
      <div class="detail">
        <div class="name">{{ comicDetail.title }}</div>
        <div class="genres">
          <div
            v-for="genre in comicDetail.genres"
            :key="genre.id"
            class="item"
            @click="handleChooseGenre(genre)"
          >
            {{ genre.name }}
          </div>
        </div>
        <div class="author">Author: {{ comicDetail.authors }}</div>
        <div class="view">
          <div class="item">
            <div class="icon">
              <eyes :width="'18'" :color="'#2ecc71'" />
            </div>
            <p>{{ formatNumber(comicDetail.total_views) }}</p>
          </div>
          <div class="item">
            <div class="icon">
              <heart :width="'18'" :color="'#e6052e'" />
            </div>
            <p>{{ formatNumber(comicDetail.followers) }}</p>
          </div>
        </div>
        <div class="description">
          {{ comicDetail.description }}
        </div>
        <div class="read-btn">
          <div class="item" @click="handleReadComic">
            <div class="icon">
              <chapter :width="'24'" :color="'#fff'" />
            </div>
            <p>Read Now</p>
          </div>
          <div v-if="isRead" class="item" @click="handleReadContinue">
            <div class="icon">
              <continue :width="'24'" :color="'#fff'" />
            </div>
            <p>Continue</p>
          </div>
        </div>
      </div>
    </div>
    <div class="chapter">
      <div class="title">
        <div class="icon">
          <chapter-2 :color="'#fff'" :width="'24'" />
        </div>
        <p>Chapters</p>
      </div>
      <div class="chapter-range">
        <div
          v-for="(chapter, idx) in listChapterRange"
          :key="idx"
          class="item"
          @click="handleFilterRange(chapter)"
        >
          {{ chapter }}
        </div>
      </div>
      <div class="chapter-item">
        <div
          v-for="chapter in listChapter"
          :key="chapter.id"
          class="item"
          @click="handleChooseChapter(chapter)"
        >
          {{ chapter.name }}
        </div>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script setup lang="ts">
declare global {
  interface Window {
    db: IDBDatabase;
  }
}
import VLazyImage from "v-lazy-image";
import Continue from "@/assets/icons/Continue.vue";
import FooterComponent from "@/components/FooterComponent/FooterComponent.vue";
import Eyes from "@/assets/icons/Eyes.vue";
import Heart from "@/assets/icons/Heart.vue";
import Chapter from "@/assets/icons/Chapter.vue";
import Chapter2 from "@/assets/icons/Chapter2.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { getDetailCommic } from "@/service/apiComic";
import { useLoadingStore } from "@/store/loading";
import { formatNumber } from "@/utils/format";
import store from "@/store";
import { useGenreStore } from "@/store/genre";
import { historyAddComic, historyDeleteComic } from "../../utils/indexedDb";
import cardbg from "@/assets/images/cardbg.jpg";

const route = useRouter();
const router = useRoute();
const idComic = ref(router.params.id);
const totalChapter = ref();
const listChapterRange = ref();
const { startProgress, stopProgress } = useLoadingStore(store);
const comicDetail = ref();
const chapterId = ref();
const listChapter = ref();
const historyDb = ref();
const isRead = ref(false);
const currentChapterId = ref();

const { setGenreName } = useGenreStore(store);

const replaceByDefault = () => {
  comicDetail.value.thumbnail = cardbg;
};

const fetchData = async (id) => {
  startProgress();
  const res = await getDetailCommic(id);
  stopProgress();
  comicDetail.value = res;
  totalChapter.value = res.chapters.length;
  chapterId.value = res.chapters[res.chapters.length - 1].id;
  listChapter.value = res.chapters;
};

watch(
  () => router.params.id,
  () => {
    if (router.fullPath.includes("detail")) {
      fetchData(router.params.id);
    }
  }
);
watch(
  () => totalChapter.value,
  () => {
    let counter = 0;
    let result: string[] = [];
    while (counter < totalChapter.value) {
      if (totalChapter.value < counter + 50) {
        result.push(`${counter} - ${totalChapter.value - 1}`);
      } else {
        result.push(`${counter} - ${counter + 50}`);
      }
      counter += 50;
    }
    listChapterRange.value = result;
  }
);

const handleChooseGenre = (genre) => {
  setGenreName(genre.name);
  route.push({
    name: "GenrePage",
    params: { genreId: genre.id, genreName: genre.name },
  });
};
const getHistoryComics = () => {
  const db = window.db;
  const trans = db.transaction("history", "readwrite");
  const store = trans.objectStore("history");
  const result: any = [];
  store.getAll().onsuccess = (event: any) => {
    result.push(event.target.result);
    historyDb.value = result[0];
    if (result[0].some((i) => i.id == idComic.value)) {
      currentChapterId.value = result[0].find(
        (i) => i.id == idComic.value
      ).chapterId;
      isRead.value = true;
    }
  };
};

onMounted(() => {
  fetchData(idComic.value);
  getHistoryComics();
});

const chapterName = computed(() => {
  return comicDetail.value.chapters.find((i) => i.id == chapterId.value).name;
});

const handleReadContinue = () => {
  route.push({
    name: "ReadPage",
    params: { id: idComic.value, chapterId: currentChapterId.value },
  });
};

const handleReadComic = () => {
  route.push({
    name: "ReadPage",
    params: { id: idComic.value, chapterId: chapterId.value },
  });

  let condition = historyDb.value
    ? historyDb.value.some((item) => item.id == idComic.value)
    : false;
  if (condition) {
    historyDeleteComic(idComic.value);
    historyAddComic({
      id: comicDetail.value.id,
      chapterId: chapterId.value,
      thumbnail: comicDetail.value.thumbnail,
      title: comicDetail.value.title,
      chapterName: chapterName.value,
    });
  } else {
    historyAddComic({
      id: comicDetail.value.id,
      chapterId: chapterId.value,
      thumbnail: comicDetail.value.thumbnail,
      title: comicDetail.value.title,
      chapterName: chapterName.value,
    });
  }
};

const handleChooseChapter = (chapter) => {
  chapterId.value = chapter.id;
  handleReadComic();
};

const handleFilterRange = (chapter) => {
  let start = chapter.split("-")[0];
  let end = chapter.split("-")[1];
  let revertList = JSON.parse(JSON.stringify(comicDetail.value.chapters));
  listChapter.value = revertList
    .slice()
    .reverse()
    .slice(Number(start), Number(end) + 1);
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/page/_detail-page.scss";
</style>
