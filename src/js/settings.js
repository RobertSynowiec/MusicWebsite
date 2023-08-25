export const select = {
  templateOf: {
    songList: '#template-song-list',
  },
  containerOf: {
    songs: '#song-list',
  }
};
export const classNames = {
  menuProduct: {
    songList: 'active',
  },
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  }
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
};
export const templates = {
  songList: Handlebars.compile(document.querySelector(select.templateOf.songList).innerHTML),
};