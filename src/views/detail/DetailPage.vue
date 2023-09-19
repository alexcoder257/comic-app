<template>
  <div v-if="comicDetail" class="detail-container">
    <div class="content">
      <div class="image">
        <img :src="comicDetail.thumbnail" alt="img" />
      </div>
      <div class="detail">
        <div class="name">{{ comicDetail.title }}</div>
        <div class="genres">
          <div v-for="genre in comicDetail.genres" :key="genre.id" class="item">
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
import Localbase from "localbase";
import store from "@/store";

const route = useRouter();
const router = useRoute();
const id = ref(router.params.id);
const totalChapter = ref();
const listChapterRange = ref();
const { startProgress, stopProgress } = useLoadingStore(store);
const comicDetail = ref();
const chapterId = ref();
const listChapter = ref();
const historyDb = ref();
const isRead = ref(false);
const currentChapterId = ref();
let db = new Localbase("db");

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

const fetchHistoryDb = () => {
  db.collection("comics")
    .get()
    .then((comics) => {
      historyDb.value = comics;
      if (comics.some((i) => i.id == id.value)) {
        currentChapterId.value = comics.find((i) => i.id == id.value).chapterId;
        isRead.value = true;
      }
    });
};

onMounted(() => {
  fetchData(id.value);
  fetchHistoryDb();
});

const chapterName = computed(() => {
  return comicDetail.value.chapters.find((i) => i.id == chapterId.value).name;
});

const handleReadContinue = () => {
  route.push({
    name: "ReadPage",
    params: { id: id.value, chapterId: currentChapterId.value },
  });
};

const handleReadComic = () => {
  route.push({
    name: "ReadPage",
    params: { id: id.value, chapterId: chapterId.value },
  });

  let condition = historyDb.value.some((item) => item.id == id.value);
  if (condition) {
    db.collection("comics").doc({ id: id.value }).update({
      chapterId: chapterId.value,
      chapterName: chapterName.value,
    });
  } else {
    db.collection("comics").add({
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
