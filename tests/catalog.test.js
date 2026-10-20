import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {filterMovies,cleanFavorites,validMovies} from '../src/utils/catalog.js';
const movies=JSON.parse(readFileSync(new URL('../public/movies.json',import.meta.url),'utf8'));
test('dataset has twelve valid films and distinct IDs',()=>{assert(validMovies(movies));assert.equal(movies.length,12);assert.equal(new Set(movies.map(m=>m.id)).size,12);});
test('search is case insensitive and trims spaces',()=>{assert.equal(filterMovies(movies,{search:'  QUIET  '})[0].id,1);});
test('genre and favorites filters work together',()=>{assert.equal(filterMovies(movies,{genre:'Sci-Fi',favoritesOnly:true,favoriteIds:[1,2]}).length,1);});
test('sorts title, year and rating without mutating original data',()=>{const original=JSON.stringify(movies);assert.equal(filterMovies(movies,{sort:'rating'})[0].rating,8.8);const sorted=filterMovies(movies,{sort:'year'});assert(sorted.every((m,i)=>i===0||m.year<=sorted[i-1].year));const titles=filterMovies(movies,{sort:'title'});assert.equal(titles[0].title,'A Perfect Mess');assert.equal(JSON.stringify(movies),original);});
test('unknown title returns empty results',()=>assert.equal(filterMovies(movies,{search:'missing title'}).length,0));
test('stored favorites are deduplicated and sanitized',()=>{assert.deepEqual(cleanFavorites([1,1,'2',null,-1,2.5,3]),[1,3]);assert.deepEqual(cleanFavorites({}),[]);});
test('invalid response data is rejected',()=>{assert(!validMovies({}));assert(!validMovies([{id:1,title:'Test'}]));});
