import { select, classNames, classFor, settings } from './settings.js';
import SongList from './components/SongList.js';
import SearchList from './components/SearchList.js';
import RandomSong from './components/RandomSong.js';
import GreenAudioPlayer from '../vendor/green-audio-player.js';
import FilterCategories from './components/FilterCategories.js';

export const app = {

  /* Single Page App */
  initPages: function () {

    this.pages = document.querySelector(select.containerOf.pages).children;

    this.links = document.querySelectorAll(select.nav.links);
    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = this.pages[0].id;

    for (let page of this.pages) {

      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    this.activatePage(pageMatchingHash);

    for (let link of this.links) {

      const thisApp = this;
      link.addEventListener('click', function (event) {

        const clikedElement = this;
        event.preventDefault();

        /* get page id from href attribute */
        const id = clikedElement.getAttribute('href').replace('#', '');

        /* run this.activePage with that id */
        thisApp.activatePage(id);

        /* change url hash */
        window.location.hash = '#/' + id;

        /* get audio id */
        let players = document.querySelectorAll(classFor.audio);

        /* stop and reset all players */
        for (let i = 0; i < players.length; i++) {
          GreenAudioPlayer.pausePlayer(players[i]);
          players[i].currentTime = 0;
        }
      });
    }
  },
  initData: function () {

    this.data = [];

    const urlSongs = settings.db.url + '/' + settings.db.songs;
    const urlAuthors = settings.db.url + '/' + settings.db.authors;


    function fetchLink(url) {
      return fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network error!');
          }
          return response.json();
        });
    }

    const promises = [fetchLink(urlSongs), fetchLink(urlAuthors)];
    Promise.all(promises)
      .then((results) => {

        /* save parasedResposne as thisApp.data.products*/
        this.data.songs = results[0];
        this.data.authors = results[1];

        this.initSongsData();
        this.initSearchData();
        this.initDiscoverData();
        this.initSearchCategories();
      });
  },
  initSongsData: function () {

    for (let songData in this.data.songs) {

      new SongList(this.data.songs[songData].id, this.data.songs[songData]);
    }
    this.initPlayer(select.containerOf.songs);
  },
  initSearchData: function () {

    new SearchList(this.data);

  },
  initDiscoverData: function () {

    new RandomSong(this.data.songs);

  },
  initButtonJoinNow: function () {

    const thisApp = this;

    const btnJoinNow = document.querySelector(classFor.btnJoinNow);

    btnJoinNow.addEventListener('click', function (event) {

      event.preventDefault();

      const clikedElement = this;
      /* get page id from href attribute */
      const id = clikedElement.getAttribute('href').replace('#', '');

      /* run this.activePage with that id */
      thisApp.activatePage(id);

      /* change url hash */
      window.location.hash = '#/' + id;

    });
  },
  activatePage: function (pageId) {

    /* add class active to matching pages, remove from non-matching*/
    for (let page of this.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);

    }
    /* add class active to matching links, remove from non-matching*/
    for (let link of this.links) {
      link.classList.toggle(classNames.nav.active, link.getAttribute('href') == '#' + pageId);

    }
  },
  initSearchCategories: function () {

    new FilterCategories(this.data);


  },
  initPlayer: function (select) {
    GreenAudioPlayer.init({ // eslint-disable-line
      selector: `${select} .player`, // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });
  },
  initToUpperCase: function () {

    const links = document.querySelectorAll(select.nav.links);

    for (let link of links) {
      const UpperCaseLinks = link.textContent.toUpperCase();
      link.innerHTML = UpperCaseLinks;
    }

  },
  init: function () {
    this.initData();
    this.initPages();
    this.initSearchData();
    this.initButtonJoinNow();
    this.initToUpperCase();

  }
};
app.init();
