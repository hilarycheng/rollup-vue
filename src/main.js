import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import axios from 'axios';
import mainHtml from './main.html';
import routerHtml from './router.html';

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
});

const main = {
  render: mainHtml.render,
  data: function() {
    return { message: 'Hello Vue!' };
  },
  mounted: function() {
   axios({
     url: 'https://jsonplaceholder.typicode.com/todos/1'
   }).then((response) => {
     console.log(response);
     this.message = response.data.title;
   });
  }
};

const routes = [
  { path: '/', component: main },
];

const router = new VueRouter({
  routes: routes
});

const app = new Vue({
  store: store,
  router: router,
  render: routerHtml.render
}).$mount('#app');
