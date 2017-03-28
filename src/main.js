import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import cards from './components/cards.vue'
import temp from './components/temp.vue'
import PathView from './components/path-view.vue';
import ClusterMap from './components/cluster-map.vue';


Vue.use(ElementUI);
Vue.use(VueRouter);

const Bar = temp;


const routes = [
    { path: '/cluster', component: ClusterMap },
    { path: '/pathview', component: PathView },
    { path: '/bar', component: Bar }
];

const router = new VueRouter({
    routes
});


new Vue({
    el: '#app',
    render: h => h(App),
    router
});



