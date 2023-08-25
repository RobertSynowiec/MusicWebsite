import { settings, templates, classNames, } from '../js/settings.js';
import SongList from '../js/components/SongList.js';
import { dataSource } from '../js/data.js';

const app = {

  initSongPlayer: function () {  //method

    const song = new SongList();
    console.log('player ', song);
    console.log('this.data:', this.data);
  },
  initData: function () {

    this.data = dataSource; // preparing access to data from the dataSource object - reference
  },

  init: function () {

    console.log('*** App starting ***');
    console.log('this:', this);
    console.log('classNames:', classNames);
    console.log('settings:', settings);
    console.log('templates:', templates);

    this.initData();
    this.initSongPlayer();
  },
};
app.init();
