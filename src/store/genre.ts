import { defineStore } from "pinia";

export const useGenreStore = defineStore("genre", {
  state: () => {
    return {
      genreName: "",
    };
  },
  getters: {
    getGenreName: (state) => state.genreName,
  },
  actions: {
    setGenreName(name) {
      this.genreName = name;
    },
  },
});
