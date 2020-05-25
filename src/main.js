import 'bootstrap'
import './scss/stylesheet.scss'
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

import router from './components/router'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faUser, faUsers, faEdit,faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faUser, faUsers, faEdit,faSignOutAlt)

const AUTHORIZATION = "AUTHORIZATION"


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = true
Vue.config.silent = true
Vue.config.devtools = true

global.eventHub = new Vue();
global.constants = {
  AUTHORIZATION: "AUTHORIZATION"
}
new Vue({
  el: '#app', router,
  render: h => h(App)
})
