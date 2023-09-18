<template>
  <button @click="handleAddUser">Add User</button>
  <div v-for="user in userList" :key="user.id">
    Username: {{ user.name }}
    <button @click="handleDeleteUser(user.id)">Delete user</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Localbase from "localbase";
let db = new Localbase("db");
const userList = ref();

const handleDeleteUser = (id: any) => {
  db.collection("users").doc({ id }).delete();
  getUser();
};

const handleAddUser = () => {
  db.collection("users").add({
    id: Math.random(),
    name: "Alex",
    age: 26,
  });
  getUser();
};

const getUser = () => {
  db.collection("users")
    .get()
    .then((user) => (userList.value = user));
};
watch(
  () => userList,
  () => {
    getUser();
  }
);
onMounted(() => {
  getUser();
});
</script>

<style lang="scss" scoped></style>
