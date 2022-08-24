import App from "./App.vue";
import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlay,
  faStop,
  faBusinessTime,
  faListCheck,
  faDiagramProject,
  faPlus,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import roteador from "./roteador";
import { key, store } from "./store";

library.add(
  faPlay,
  faStop,
  faBusinessTime,
  faListCheck,
  faDiagramProject,
  faPlus,
  faPencilAlt,
  faTrash
);

createApp(App)
  .use(roteador)
  .use(store, key)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
