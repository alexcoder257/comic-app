<template>
  <div class="detail-container">
    <div class="content">
      <div class="image">
        <img src="/assets/images/sliderBackground1.jpg" alt="img" />
      </div>
      <div class="detail">
        <div class="name">Võ Luyện Đỉnh Phong</div>
        <div class="genres">
          <div class="item">Action</div>
          <div class="item">Fantasy</div>
          <div class="item">Manhua</div>
          <div class="item">Shounen</div>
          <div class="item">Supernatural</div>
        </div>
        <div class="author">Author: Alex Dang</div>
        <div class="view">
          <div class="item">
            <div class="icon">
              <eyes :width="'18'" :color="'#2ecc71'" />
            </div>
            <p>95,961,226</p>
          </div>
          <div class="item">
            <div class="icon">
              <heart :width="'18'" :color="'#e6052e'" />
            </div>
            <p>24,140,895</p>
          </div>
        </div>
        <div class="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          veritatis quam magnam commodi! Officia, perferendis obcaecati
          reprehenderit dolor libero nisi asperiores, at ad cupiditate, natus
          velit? Reiciendis voluptatum atque minus!
        </div>
        <div class="read-btn" @click="handleReadComic">
          <div class="icon">
            <chapter :width="'24'" :color="'#fff'" />
          </div>
          <p>Read Now</p>
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
        <div class="item">0 - 50</div>
        <div class="item">51 - 100</div>
        <div class="item">101 - 150</div>
        <div class="item">151 - 200</div>
        <div class="item">201 - 250</div>
        <div class="item">251 - 300</div>
        <div class="item">301 - 350</div>
        <div class="item">351 - 400</div>
        <div class="item">401 - 450</div>
      </div>
      <div class="chapter-item">
        <div class="item">Chapter 1</div>
        <div class="item">Chapter 2</div>
        <div class="item">Chapter 3</div>
        <div class="item">Chapter 4</div>
        <div class="item">Chapter 5</div>
        <div class="item">Chapter 6</div>
        <div class="item">Chapter 7</div>
        <div class="item">Chapter 8</div>
        <div class="item">Chapter 9</div>
        <div class="item">Chapter 10</div>
        <div class="item">Chapter 11</div>
        <div class="item">Chapter 12</div>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script setup lang="ts">
import FooterComponent from "@/components/FooterComponent/FooterComponent.vue";
import Eyes from "@/assets/icons/Eyes.vue";
import Heart from "@/assets/icons/Heart.vue";
import Chapter from "@/assets/icons/Chapter.vue";
import Chapter2 from "@/assets/icons/Chapter2.vue";
import { useRouter } from "vue-router";

const route = useRouter();

const handleReadComic = () => {
  route.push({ name: "ReadPage" });
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/page/_detail-page.scss";
</style>
