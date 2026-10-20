export function filterMovies(movies,{search='',genre='All films',sort='rating',favoritesOnly=false,favoriteIds=[]}={}) {
 const query=search.trim().toLowerCase();
 return movies.filter(movie=>(!query||movie.title.toLowerCase().includes(query))&&(genre==='All films'||movie.genre===genre)&&(!favoritesOnly||favoriteIds.includes(movie.id)))
 .sort((a,b)=>sort==='title'?a.title.localeCompare(b.title):sort==='year'?b.year-a.year:b.rating-a.rating);
}
export function cleanFavorites(value){return Array.isArray(value)?[...new Set(value.filter(id=>Number.isInteger(id)&&id>0))]:[];}
export function validMovies(value){return Array.isArray(value)&&value.every(m=>Number.isInteger(m.id)&&typeof m.title==='string'&&typeof m.genre==='string'&&typeof m.year==='number'&&typeof m.rating==='number'&&typeof m.poster==='string'&&typeof m.description==='string'&&typeof m.director==='string'&&Array.isArray(m.cast)&&typeof m.duration==='number');}
