<template>
  <div v-if="listComic" class="history-container">
    <div class="content">
      <div v-if="listComic.length" class="title">HISTORY:</div>
      <div v-else class="title">NO HISTORY</div>
      <div class="commic-container">
        <div
          v-for="(item, idx) in listComic"
          :key="item.id"
          class="commic-item"
        >
          <div class="thumbnail" @click="handleViewDetail(item)">
            <v-lazy-image
              :src="item.thumbnail"
              @error="replaceByDefault(idx)"
            />
          </div>
          <div class="name">{{ item.title }}</div>
          <div class="chapter">Đọc tiếp: {{ item.chapterName }}</div>
          <div class="rating">
            <div class="continue" @click="handleContinue(item)">
              <div class="icon">
                <continue :width="'14'" :color="'#fff'" />
              </div>
              <p>Continue</p>
            </div>
            <div class="delete" @click="handleDelete(item.id)">
              <div class="icon">
                <trash-bin :width="'14'" :color="'#fff'" />
              </div>
              <p>Delete</p>
            </div>
          </div>
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
import Continue from "@/assets/icons/Continue.vue";
import TrashBin from "@/assets/icons/TrashBin.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import FooterComponent from "@/components/FooterComponent/FooterComponent.vue";
import { historyDeleteComic } from "../../utils/indexedDb";
import VLazyImage from "v-lazy-image";
import cardbg from "@/assets/images/cardbg.jpg";

const router = useRouter();
const listComic = ref();
const replaceByDefault = (idx) => {
  listComic.value[idx].thumbnail = cardbg;
};

const getHistoryComics = () => {
  const db = window.db;
  const trans = db.transaction("history", "readwrite");
  const store = trans.objectStore("history");
  const result: any = [];
  store.getAll().onsuccess = (event: any) => {
    result.push(event.target.result);
    listComic.value = result[0];
  };
};

onMounted(() => {
  getHistoryComics();
});

const handleViewDetail = (item: any) => {
  router.push({ name: "DetailPage", params: { id: item.id } });
};

const handleContinue = (item) => {
  router.push({
    name: "ReadPage",
    params: { id: item.id, chapterId: item.chapterId },
  });
};

const handleDelete = (id) => {
  historyDeleteComic(id);
  const idx = listComic.value.findIndex((i) => i.id == id);
  listComic.value.splice(idx, 1);
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/page/_history-page.scss";
</style>
