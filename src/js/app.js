import { select, classNames, classFor, settings } from './settings.js';

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

      });
    }
  },
  initData: function () {

    this.data = {};

    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(rawResponse => rawResponse.json())
      .then(parsedResponse => {

        /* save parasedResposne as thisApp.data.products*/
        this.data.songs = parsedResponse;

      });
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
  initPlayer: function (select) {
    GreenAudioPlayer.init({ // eslint-disable-line
      selector: `${select} .player`, // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });
  },
  init: function () {
    this.initData();
    this.initPages();
    this.initButtonJoinNow();

  },
};
app.init();
