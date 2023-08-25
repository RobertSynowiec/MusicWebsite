import { settings, templates, classNames, } from '../js/settings.js';
import SongList from '../js/components/SongList.js';
const app = {

  initSongPlayer: () => {

    const player = new SongList();
    console.log('player ', player);
  },

  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('classNames:', classNames);
    console.log('settings:', settings);
    console.log('templates:', templates);
  },
};
app.init();
