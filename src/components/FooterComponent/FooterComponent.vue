<template>
  <div class="footer">
    <div class="logo">
      <div class="image">
        <img src="/assets/images/logo.png" alt="img" />
      </div>
      <div class="title">COMICBOX</div>
    </div>
    <div class="description">
      If you too want to get excited over manga heroes's great performances with
      other readers all over the world, Mangabox is the best place for you
    </div>
    <div class="link">
      <div class="link-item">Help/FAQ</div>
      <div class="link-item">Blog & News</div>
      <div class="link-item">Feedback</div>
      <div class="link-item">Privacy Policy</div>
      <div class="link-item">Terms of Service</div>
      <div class="link-item">Copyright</div>
    </div>
    <div class="social">
      <div class="logo">
        <facebook :width="'20'" :color="'#fff'" />
      </div>
      <div class="logo">
        <tiktok :width="'20'" :color="'#fff'" />
      </div>
      <div class="logo">
        <youtube :width="'20'" :color="'#fff'" />
      </div>
      <div class="logo">
        <instagram :width="'20'" :color="'#fff'" />
      </div>
    </div>
    <div class="copy-right">
      <copy-right :width="'20'" :color="'#fff'" />
      2023 Design by Alex Dang
    </div>
  </div>
</template>

<script setup lang="ts">
import CopyRight from "@/assets/icons/CopyRight.vue";
import Facebook from "@/assets/icons/Facebook.vue";
import Instagram from "@/assets/icons/Instagram.vue";
import Tiktok from "@/assets/icons/Tiktok.vue";
import Youtube from "@/assets/icons/Youtube.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/_footer.scss";
</style>