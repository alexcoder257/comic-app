<template>
  <div class="header-container">
    <div class="header-left">
      <div class="logo">
        <img src="/assets/images/logo.png" alt="logo" />
        <router-link to="/" class="title">MANGABOX</router-link>
      </div>
      <div class="list-genre">
        <div
          v-for="item in genres"
          :key="item.id"
          class="genre-item"
          @click="handleChooseGenre(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="search-bar">
      <input
        v-model="inputQuery"
        type="text"
        placeholder="Search favorite comic"
      />
      <div class="icon">
        <search-icon :color="`#fff`" :width="`24`" />
      </div>
      <div
        v-if="isShow && listComic"
        class="dropdown"
        v-click-outside="handleCloseDropdown"
      >
        <div
          v-for="item in listComic"
          :key="item.id"
          class="item"
          @click="handleChooseComic(item)"
        >
          <div class="thumbnail">
            <img :src="item.thumbnail" alt="img" />
          </div>
          <div class="detail">
            <div class="title">{{ item.title }}</div>
            <div class="author">{{ item.authors.join(",") }}</div>
            <div class="category">
              {{ item.genres.join(", ") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import { computed, ref, watch } from "vue";
import { getSearchSuggest } from "@/service/apiComic";
import { useToggle } from "@/hooks/useToggle";
import { stringify } from "qs";
import { useRouter } from "vue-router";

const { isShow, open, close } = useToggle();
const inputQuery = ref("");

const listComic = ref();

const router = useRouter();

const genres = [
  {
    id: "manga-112",
    name: "Manga",
    description: "Truyện tranh của Nhật Bản",
  },
  {
    id: "manhua",
    name: "Manhua",
    description: "Truyện tranh của Trung Quốc",
  },
  {
    id: "manhwa-11400",
    name: "Manhwa",
    description: "Truyện tranh Hàn Quốc, đọc từ trái sang phải",
  },
];

const queryString = computed(() =>
  stringify(
    {
      q: inputQuery.value,
    },
    {
      arrayFormat: "comma",
    }
  )
);

const fetchData = async () => {
  const res = await getSearchSuggest(queryString.value);
  listComic.value = res;
};

watch(
  () => inputQuery.value,
  () => {
    if (inputQuery.value !== "") {
      fetchData();
    }
    open();
  }
);

const handleCloseDropdown = () => {
  close();
};

const handleChooseGenre = (item) => {
  console.log(item);
  router.push({
    name: "GenrePage",
    params: { genreId: item.id, genreName: item.name },
  });
};

const handleChooseComic = (item) => {
  router.push({ name: "DetailPage", params: { id: item.id } });
  close();
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_header-component.scss";
</style>
