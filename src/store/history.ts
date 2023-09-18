import { defineStore } from "pinia";

export const useHistory = defineStore("loading", {
  state: () => {
    return {
      comicHistory:[]
    };
  },
  getters: {
    comicHistory: (state) => state.comicHistory,
  },
  actions: {
    const dbName = "ComicDatabase",
    
    startProgress() {
      this.inProgressApiCount += 1;
    },
    stopProgress() {
      this.inProgressApiCount -= 1;
    },
  },
});
