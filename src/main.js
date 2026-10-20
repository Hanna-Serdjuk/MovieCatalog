import {createApp} from 'vue';
import {createRouter,createWebHashHistory} from 'vue-router';
import App from './App.vue';
import CatalogView from './views/CatalogView.vue';
import MovieView from './views/MovieView.vue';
import './style.css';
const router=createRouter({history:createWebHashHistory(),routes:[
 {path:'/',component:CatalogView},
 {path:'/favorites',component:CatalogView,props:{favoritesOnly:true}},
 {path:'/movie/:id',component:MovieView},
 {path:'/:pathMatch(.*)*',redirect:'/'}
]});
router.afterEach(()=>window.scrollTo({top:0,behavior:'instant'}));
createApp(App).use(router).mount('#app');
