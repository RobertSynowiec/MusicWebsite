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
    discover: '#discover-list',
    categories: '#categories',
    categoriesLink: '.category a',
    homePalayer: '.player-song',
    homePalayerCategories: 'p.song-categories'
  },
  nav: {
    links: '.link a',
  },
  search: {
    form: 'search-form',
    input: 'search-input',
    result: 'results-list',
  },
};
export const idNames = {
  id: {
    showAll: '#showAll'
  }
};
export const classNames = {
  pages: {
    active: 'active',
    hidden: 'hidden'
  },
  nav: {
    active: 'active',
  },
};
export const settings = {
  db: {
    //url: '//localhost:3131',
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
    songs: 'songs',
    authors: 'authors',
  }
};
export const classFor = {
  player: '.player',
  playerDownload: '.player-with-download',
  playerAccessibility: '.player-with-accessibility',
  subscribe: '.subscribe',
  btnJoinNow: '.btn-join a',
  audio: '.green-audio-player audio'
};
export const templates = {
  songList: Handlebars.compile(document.querySelector(select.templateOf.songList).innerHTML),
};