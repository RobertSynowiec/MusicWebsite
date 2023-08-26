export const select = {
  templateOf: {
    songList: '#template-song-list',
    searchList: '#template-search-list',
    dicoverList: '#template-discover-list',
  },
  containerOf: {
    songs: '#song-list',
    search: '#search-list',
    pages: '#pages',
  },
  nav: {
    links: '.link a',
  },
  search: {
    form: 'search-form',
    input: 'search-input',
    result: 'results-list'
  },
};
export const classNames = {
  pages: {
    active: 'active',
  },
  nav: {
    active: 'active',
  },
};
export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
  }
};
export const classFor = {
  player: '.player',
  playerDownload: '.player-with-download',
  playerAccessibility: '.player-with-accessibility',
  subscribe: '.subscribe',
};
export const templates = {
  songList: Handlebars.compile(document.querySelector(select.templateOf.songList).innerHTML),
  searchList: Handlebars.compile(document.querySelector(select.templateOf.searchList).innerHTML),
  discoverList: Handlebars.compile(document.querySelector(select.templateOf.dicoverList).innerHTML),
};