import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import Select2 from "vue3-select2-component";

const app = createApp(App);
app.use(router);
app.mount("#app");
app.component("Select2", Select2);
