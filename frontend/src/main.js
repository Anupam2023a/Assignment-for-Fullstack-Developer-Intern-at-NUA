import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)

const vuetify = new Vuetify({
  icons:{
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')