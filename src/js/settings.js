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
export const templates = {
  menuProduct: Handlebars.compile(document.querySelector(select.templateOf.songList).innerHTML),
};