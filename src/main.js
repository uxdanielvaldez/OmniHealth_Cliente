import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import fullCalendar from 'vue-fullcalendar'


Vue.component('full-calendar', fullCalendar)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
