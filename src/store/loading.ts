import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => {
    return {
      inProgressApiCount: 0,
    };
  },
  getters: {
    progressFlag: (state): boolean => state.inProgressApiCount > 0,
  },
  actions: {
    startProgress() {
      this.inProgressApiCount += 1;
    },
    stopProgress() {
      this.inProgressApiCount -= 1;
    },
  },
});
