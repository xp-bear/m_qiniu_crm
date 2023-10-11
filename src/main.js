import { createApp } from "vue";
import "./common.css";
import App from "./App.vue";
import router from "./router";
import Varlet from "@varlet/ui";
import "@varlet/ui/es/style";
// pinia 引入
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Varlet);
app.mount("#app");
