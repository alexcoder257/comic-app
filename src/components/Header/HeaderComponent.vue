m
<template>
  <div class="header-container">
    <div class="header-left">
      <div class="logo">
        <img src="/assets/images/logo.png" alt="logo" />
        <router-link to="/" class="title">COMICBOX</router-link>
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
      <div v-if="isShow && listComic" class="dropdown">
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
                <img :src="item.thumbnail" alt="img" />
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
            v-for="item in genres"
            :key="item.id"
            class="genre-item-side"
            @click="handleChooseGenre(item)"
          >
            {{ item.name }}
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
import Menu from "@/assets/icons/Menu.vue";
import Cancel from "@/assets/icons/Cancel.vue";

const { isShow, open, close, toggle } = useToggle();
const isShowDropdown = ref(true);
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
  {
    id: "boy-comics",
    name: "Boy Comics",
    description: "Truyện tranh Hàn Quốc, đọc từ trái sang phải",
  },
  {
    id: "girl-comics",
    name: "Girl Comics",
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
      isShowDropdown.value = true;
      open();
      fetchData();
    } else {
      close();
      isShowDropdown.value = false;
    }
  }
);

const handleCloseDropdown = () => {
  close();
};

const handleOpenDropdown = () => {
  open();
};

const handleChooseGenre = (item) => {
  router.push({
    name: "GenrePage",
    params: { genreId: item.id, genreName: item.name },
  });
  isShowDropdown.value = false;
  close();
};

const handleChooseComic = (item) => {
  router.push({ name: "DetailPage", params: { id: item.id } });
  close();
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_header-component.scss";
</style>
