import { createApp } from "vue";
import "./common.css";
import App from "./App.vue";
import router from "./router";
import Varlet from "@varlet/ui";
import "@varlet/ui/es/style";
import "@varlet/ui/es/styles/elevation.css";
import "animate.css";
// pinia 引入
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Varlet);
app.mount("#app");
