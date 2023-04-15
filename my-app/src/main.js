import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue} from 'bootstrap-vue'
import VueQrcodeReader from "vue-qrcode-reader";
import VueHead from "vue-head";

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue);
Vue.use(VueQrcodeReader);
Vue.use(VueHead)