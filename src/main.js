import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './config/routes';

Vue.use(VueRouter);

const router = new VueRouter({
	routes
});

global.API = 'https://pokeapi.co/api/v2/';
new Vue({
	// vuetify,
	router,
	// store,
	render: h => h(App)
}).$mount('#app');
