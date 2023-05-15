import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/css/reset.css";

const app = createApp(App);
// 组件
import HeaderNav from "@/components/HeaderNav.vue";
app.component("HeaderNav", HeaderNav);
import Footer from "../src/components/Footer.vue";
app.component("Footer", Footer);

app.use(router);

app.mount("#app");
