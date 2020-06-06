import 'bootstrap'
import './scss/stylesheet.scss'
import Vue from 'vue'
import App from './App.vue'

import router from './components/router'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCalendar, faEdit, faSignOutAlt, faUser, faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import JSONEditor from 'jsoneditor/dist/jsoneditor.min'
import 'jsoneditor/dist/jsoneditor.min.css'

const moment = require('moment');
library.add(faUser, faUsers, faEdit, faSignOutAlt, faCalendar);


Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = true;
Vue.config.silent = true;
Vue.config.devtools = true;
Vue.filter("localdate", (value) => {
  return moment(value).local().format("MMM Do YY HH:mm:ss")
});
Vue.filter("nullHandler", (value) => {
  return value === undefined ? "" : value
});
Vue.filter("ucFirst", (value) => {

  return value.toString().charAt(0).toUpperCase() + value.slice(1)
});
global.eventHub = new Vue();
global.constants = {
  AUTHORIZATION: "AUTHORIZATION",
  JSONEditor: JSONEditor
};
new Vue({
  el: '#app', router,
  render: h => h(App)
});

