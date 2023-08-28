import { templates, select } from '../settings.js';
import { dataSource } from '../data.js';
import { utils } from '../utilis.js';
import { app } from '../app.js';

{
  ('use strict');
  class RandomSong {

    constructor() {

      this.randomSongArray = [];

      this.getElement();
      this.initData();
      this.randomSong();
      this.render();
      app.initPlayer(select.containerOf.discover);

    }
    getElement() {

      this.discoverList = document.querySelector(select.containerOf.discover);
    }
    initData() {
      this.data = dataSource.songs; // reference to the data in the data.js file
    }
    randomSong() {

      /* Randomly pick a song from the array */
      const randomIndex = Math.floor(Math.random() * this.data.length);
      const selectedSong = this.data[randomIndex];
      this.randomSongArray.push(selectedSong);
    }
    render() {

      /* iterating over all songs in randomSong*/
      for (let elem of this.randomSongArray) {

        /* html code generation */
        const generatedHTML = templates.songList(elem);

        /* generating dom element for all tracks */
        const generatedElementDOM = utils.createDOMFromHTML(generatedHTML);

        /* The generated DOM element is added as a new DOM child to the dicoverList */
        this.discoverList.appendChild(generatedElementDOM);

      }
    }
  }
    const templateManager = new RandomSong(); // eslint-disable-line
}
