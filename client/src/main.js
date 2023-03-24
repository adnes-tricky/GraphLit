import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"
createApp(App).use(router,VueCookies,VNetworkGraph).mount('#app')
