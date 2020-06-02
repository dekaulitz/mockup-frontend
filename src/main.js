import 'bootstrap'
import './scss/stylesheet.scss'
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

import router from './components/router'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faUser, faUsers, faEdit, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import JSONEditor from 'jsoneditor/dist/jsoneditor.min'
import 'jsoneditor/dist/jsoneditor.min.css'
library.add(faUser, faUsers, faEdit, faSignOutAlt)


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = true
Vue.config.silent = true
Vue.config.devtools = true

global.eventHub = new Vue();
global.constants = {
  AUTHORIZATION: "AUTHORIZATION",
  JSONEditor: JSONEditor
}
new Vue({
  el: '#app', router,
  render: h => h(App)
})
