import Vue from 'vue'
import App from "./App.vue";
import { createApp } from "vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay, faStop, faBusinessTime } from '@fortawesome/free-solid-svg-icons'

library.add(faPlay, faStop, faBusinessTime)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')