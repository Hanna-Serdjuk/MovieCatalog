import {ref} from 'vue';
import {cleanFavorites,validMovies} from '../utils/catalog.js';
// Module-level refs are shared by every component. Pinia is unnecessary for this small app.
const movies=ref([]),loading=ref(true),error=ref(''),favoriteIds=ref([]),storageMessage=ref('');
const key='frame-favorite-movies';let initialized=false;
function readFavorites(){try{favoriteIds.value=cleanFavorites(JSON.parse(localStorage.getItem(key)||'[]'));}catch{favoriteIds.value=[];storageMessage.value='Saved favorites could not be read. Your list starts fresh.';}}
async function loadMovies(){loading.value=true;error.value='';try{const response=await fetch(`${import.meta.env.BASE_URL}movies.json`);if(!response.ok)throw new Error('Request failed');const data=await response.json();if(!validMovies(data))throw new Error('Invalid movie data');movies.value=data;}catch{error.value='We couldn’t load the films. Check your connection and try again.';}finally{loading.value=false;}}
function toggleFavorite(id){favoriteIds.value=favoriteIds.value.includes(id)?favoriteIds.value.filter(item=>item!==id):[...favoriteIds.value,id];try{localStorage.setItem(key,JSON.stringify(favoriteIds.value));}catch{storageMessage.value='Browser storage is unavailable. Favorites will last for this session only.';}}
export function useMovies(){if(!initialized){initialized=true;readFavorites();loadMovies();}return{movies,loading,error,favoriteIds,storageMessage,loadMovies,toggleFavorite,isFavorite:id=>favoriteIds.value.includes(id)};}
