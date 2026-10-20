# FRAME — Movie discovery

A small frontend portfolio project built with **Vue 3, JavaScript, Vue Router and Vite**. An original dark editorial interface, local JSON dataset and original SVG posters.

All twelve films, directors, casts and ratings are fictional demo content. No real streaming platform or movie API is connected.

## Run locally

Requires Node.js 20.19+ and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite.

```sh
npm test
npm run build
npm run preview
```

The downloadable ZIP also includes a ready-made `dist/` build. Serve it with an HTTP server; do not open index.html using file:// because the catalogue is fetched as JSON.

## Features

- Search by title, genre filtering and sorting by rating, year or name.
- Separate detail routes and related films.
- Watchlist persisted in localStorage with read/write failure feedback.
- Real asynchronous fetch of a local JSON file, loading skeleton, retry and empty states.
- Invalid movie link state.
- Responsive layout, semantic controls and reduced-motion support.
- Seven automated tests for filtering, sorting, data validation and favorite sanitization.

## Structure

```text
public/
  movies.json           Local movie data loaded with fetch
  posters/              Original SVG artwork
src/
  components/           MovieCard, SearchBar, GenreFilter, AppIcon
  composables/          Shared movies and favorites state
  utils/                Pure filtering and data validation
  views/                Catalogue / watchlist and film detail views
  App.vue               Header, footer and project information
  main.js               Vue and router setup
  style.css             Responsive styles
 tests/                 Node.js unit tests
```

## Why it is kept simple

A single shared composable holds the catalogue and favorite IDs. Pinia is unnecessary for this scale. Computed properties derive visible results from the search, genre and sort values. Components receive data via props and emit changes with v-model. Hash routing works on static hosting without server rewrite rules. No backend, authentication or API keys are needed.

## Practice tasks

1. Explain how `filterMovies` combines the active filters.
2. Add a minimum-rating filter and a matching test.
3. Add a watched/unwatched toggle.
4. Replace the local JSON request with a real API when ready.
5. Add a component test for the bookmark button.

## GitHub upload

Extract the ZIP and upload the contents to your repository root, preserving the `src`, `public` and `tests` folders. Do not upload node_modules. The included `.github/workflows/pages.yml` builds and deploys to GitHub Pages: enable Settings → Pages → GitHub Actions, then run the workflow from the Actions tab.

Production build and automated unit tests were verified. Visual browser testing was unavailable in the creation environment.
