import { createApp } from "vue";
import "@/assets/styles/style.scss";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/index";
import vClickOutside from "click-outside-vue3";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vClickOutside);
app.mount("#app");
