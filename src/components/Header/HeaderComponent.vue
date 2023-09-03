<template>
  <div class="header-container">
    <div class="header-left">
      <div class="logo">
        <img src="/assets/images/logo.png" alt="logo" />
        <router-link to="/" class="title">MANGABOX</router-link>
      </div>
      <div class="list">
        <router-link to="/">Comic list</router-link>
        <div class="icon">
          <arrow-down :color="`#fff`" :width="`24`" />
        </div>
      </div>
      <router-link to="/about">About</router-link>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="Search favorite comic" />
      <div class="icon">
        <search-icon :color="`#fff`" :width="`24`" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowDown from "@/assets/icons/ArrowDown.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
</script>

<style lang="scss" scoped>
.header-container {
  width: 100vw;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  padding: 0 9%;
  .header-left {
    display: flex;
    align-items: center;
    gap: 32px;
    .logo {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        margin-right: 12px;
      }
    }
    .list {
      display: flex;
      align-items: center;
      .icon {
        font-size: 12px;
      }
    }
  }
  a {
    text-decoration: none;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }
  .search-bar {
    background-color: #4f4e4e;
    height: 42px;
    width: 300px;
    border-radius: 24px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      border: none;
      width: 80%;
      background: #4f4e4e;
      outline: none;
      color: #fff;
      &::placeholder {
        color: blue;
        font-size: 14px;
        color: #fff;
      }
    }
    .icon {
      display: flex;
      align-items: center;
    }
  }
}
</style>
