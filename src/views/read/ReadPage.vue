<template>
  <div class="read-container" @scroll="handleScroll">
    <div v-if="!isScroll" class="nav-bar-top">
      <div class="icon-home" @click="handleRedirect">
        <home :width="'24'" :color="'#fff'" />
      </div>
      <div class="icon-back">
        <arrow-left :width="'24'" :color="'#fff'" />
      </div>
      <div class="chapter">
        <input type="text" placeholder="Chapter ..." value="Chapter 1" />
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
          <p>Chapter 1</p>
          <p>Chapter 2</p>
          <p>Chapter 3</p>
          <p>Chapter 4</p>
          <p>Chapter 5</p>
          <p>Chapter 6</p>
        </div>
      </div>
      <div class="icon-next">
        <arrow-right :width="'24'" :color="'#fff'" />
      </div>
    </div>
    <div class="content">
      <img src="/assets/images/sliderBackground3.jpg" alt="img" />
    </div>
    <div v-if="isScroll" class="nav-bar-bottom">
      <div class="icon-home" @click="handleRedirect">
        <home :width="'24'" :color="'#fff'" />
      </div>
      <div class="icon-back">
        <arrow-left :width="'24'" :color="'#fff'" />
      </div>
      <div class="chapter">
        <input type="text" placeholder="Chapter ..." value="Chapter 1" />
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
          <p>Chapter 1</p>
          <p>Chapter 2</p>
          <p>Chapter 3</p>
          <p>Chapter 4</p>
          <p>Chapter 5</p>
          <p>Chapter 6</p>
        </div>
      </div>
      <div class="icon-next">
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const { isShow, toggle, close } = useToggle();
const route = useRouter();
const isScroll = ref(false);
const handleClickOutside = () => {
  toggle();
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

const handleRedirect = () => {
  route.push({ name: "HomePage" });
};

const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleScroll = () => {
  let lastScrollTop = 0;
  let lastScrollBottom = 0;
  const scrollTop = window.scrollY;
  const scrollBottom = window.scrollX;
  if (scrollTop > lastScrollTop) {
    console.log("he");
    isScroll.value = false;
  } else {
    console.log("aae");
    isScroll.value = true;
  }
  if (lastScrollTop != 0) {
    isScroll.value = true;
  }
  lastScrollBottom = scrollBottom;
  lastScrollTop = scrollTop;

  console.log(window);
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/page/_read-page.scss";
</style>