import { select, classNames } from './settings.js';

export const app = {

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
  activatePage: function (pageId) {

    /* add class active to matching pages, remove from non-matching*/
    for (let page of this.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);

    }
    for (let link of this.links) {
      link.classList.toggle(classNames.nav.active, link.getAttribute('href') == '#' + pageId);

    }
  },

  initPlayer: function () {

    GreenAudioPlayer.init({ // eslint-disable-line
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });

  },
  init: function () {
    this.initPlayer();
    this.initPages();

  },
};
app.init();
