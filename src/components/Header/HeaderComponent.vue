<template>
  <div class="header-container">
    <div class="header-left">
      <div class="logo" @click="handleRedirectHome">
        <v-lazy-image :src="logo" />
        <p class="title">COMICBOX</p>
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
    <div class="search-container">
      <div class="history-icon" @click="handleRedirectHistory">
        <history :width="'24'" color="#fff" />
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
        <div v-if="isShow && listComic" class="dropdown">
          <div
            v-for="item in listComic"
            :key="item.id"
            class="item"
            @click="handleChooseComic(item)"
          >
            <div class="thumbnail">
              <v-lazy-image :src="item.thumbnail" />
            </div>
            <div class="detail">
              <div class="title">{{ item.title }}</div>
              <div class="author">
                {{ item.authors[0] }}
              </div>
              <div class="category">
                {{ item.genres.join(", ") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dropdown-bar">
      <div v-if="isShow" class="overlay"></div>
      <div v-if="!isShow" class="icon-menu" @click="handleOpenDropdown">
        <Menu :width="'32'" :color="'#fff'" />
      </div>
      <div v-else class="dropdown">
        <div class="icon-cancel" @click="handleCloseDropdown">
          <Cancel :width="'42'" :color="'#fff'" />
        </div>
        <div class="search-bar-side">
          <input
            v-model="inputQuery"
            type="text"
            placeholder="Search favorite comic"
          />
          <div v-if="isShowDropdown && listComic" class="dropdown-side">
            <div
              v-for="item in listComic"
              :key="item.id"
              class="item"
              @click="handleChooseComic(item)"
            >
              <div class="thumbnail">
                <v-lazy-image :src="item.thumbnail" />
              </div>
              <div class="detail">
                <div class="title">{{ item.title }}</div>
                <div class="author">{{ item.authors[0] }}</div>
                <div class="category">
                  {{ item.genres.join(", ") }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-genre-side">
          <div
            class="genre-item-side"
            @click="
              handleChooseGenre({ id: genres[0].id, name: genres[0].name })
            "
          >
            <div class="icon">
              <manga :width="'24'" :color="'#fff'" />
            </div>
            <p>
              {{ genres[0].name }}
            </p>
          </div>
          <div
            class="genre-item-side"
            @click="
              handleChooseGenre({ id: genres[1].id, name: genres[1].name })
            "
          >
            <div class="icon">
              <fantasy :width="'24'" :color="'#fff'" />
            </div>
            <p>
              {{ genres[1].name }}
            </p>
          </div>
          <div
            class="genre-item-side"
            @click="
              handleChooseGenre({ id: genres[2].id, name: genres[2].name })
            "
          >
            <div class="icon">
              <heart-2 :width="'24'" :color="'#fff'" />
            </div>
            <p>
              {{ genres[2].name }}
            </p>
          </div>
          <div
            class="genre-item-side"
            @click="
              handleChooseGenre({ id: genres[3].id, name: genres[3].name })
            "
          >
            <div class="icon">
              <boy-icon :width="'24'" :color="'#fff'" />
            </div>
            <p>
              {{ genres[3].name }}
            </p>
          </div>
          <div
            class="genre-item-side"
            @click="
              handleChooseGenre({ id: genres[4].id, name: genres[4].name })
            "
          >
            <div class="icon">
              <girl-comic :width="'24'" :color="'#fff'" />
            </div>
            <p>
              {{ genres[4].name }}
            </p>
          </div>
          <div class="genre-item-side" @click="handleRedirectHistory">
            <div class="icon">
              <history :width="'24'" :color="'#fff'" />
            </div>
            <p>History</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VLazyImage from "v-lazy-image";
import Manga from "@/assets/icons/Manga.vue";
import Fantasy from "@/assets/icons/Fantasy.vue";
import Heart2 from "@/assets/icons/Heart2.vue";
import BoyIcon from "@/assets/icons/BoyIcon.vue";
import GirlComic from "@/assets/icons/GirlComic.vue";
import History from "@/assets/icons/History.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import { computed, ref, watch } from "vue";
import { getSearchSuggest } from "@/service/apiComic";
import { useToggle } from "@/hooks/useToggle";
import { stringify } from "qs";
import { useRouter } from "vue-router";
import Menu from "@/assets/icons/Menu.vue";
import Cancel from "@/assets/icons/Cancel.vue";
import { useGenreStore } from "@/store/genre";
import store from "@/store";
import logo from "@/assets/images/logo.png";

const { isShow, open, close } = useToggle();
const isShowDropdown = ref(true);
const inputQuery = ref("");
const { setGenreName } = useGenreStore(store);

const listComic = ref();

const router = useRouter();

const genres = [
  {
    id: "manga-112",
    name: "Manga",
  },
  {
    id: "fantasy-105",
    name: "Fantasy",
  },
  {
    id: "romance-121",
    name: "Romance",
  },
  {
    id: "boy-comics",
    name: "Boy Comics",
  },
  {
    id: "girl-comics",
    name: "Girl Comics",
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

const debounceDelay = 300;

const debounce = (callback, delay) => {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback();
    }, delay);
  };
};

const fetchData = async () => {
  const res = await getSearchSuggest(queryString.value);
  listComic.value = res;
};

const debounceSearch = debounce(() => {
  fetchData();
}, debounceDelay);

watch(
  () => [inputQuery.value, debounceSearch],
  () => {
    if (inputQuery.value !== "") {
      isShowDropdown.value = true;
      open();
      debounceSearch();
    } else {
      close();
      isShowDropdown.value = false;
    }
  }
);

const handleRedirectHistory = () => {
  router.push({ name: "History" });
  close();
};

const handleCloseDropdown = () => {
  close();
};

const handleOpenDropdown = () => {
  open();
};

const handleChooseGenre = (item) => {
  setGenreName(item.name);
  router.push({
    name: "GenrePage",
    params: { genreId: item.id, genreName: item.name },
  });
  isShowDropdown.value = false;
  close();
};

const handleRedirectHome = () => {
  router.push({ name: "HomePage" });
};

const handleChooseComic = (item) => {
  router.push({ name: "DetailPage", params: { id: item.id } });
  close();
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_header-component.scss";
</style>
