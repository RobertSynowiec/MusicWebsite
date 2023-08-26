import { templates, select } from '../settings.js';
import { dataSource } from '../data.js';
import { utils } from '../utilis.js';
//import { app } from '../app.js';

class SongList {

  constructor() {

    this.getElement();
    this.initData();
    this.render();
    //app.initPlayer();
  }
  getElement() {

    this.songList = document.querySelector(select.containerOf.songs);
  }
  initData() {
    this.data = dataSource.songs; // reference to the data in the data.js file
  }
  /*creating the html code (#home) based on the Handlebars template*/
  render() {

    /* iterating over all songs in data.js */
    for (let elem of this.data) {

      /* html code generation */
      const generatedHTML = templates.songList(elem);

      /* generating dom element for all tracks */
      const generatedElementDOM = utils.createDOMFromHTML(generatedHTML);

      /* The generated DOM element is added as a new DOM child to the .songList */
      this.songList.appendChild(generatedElementDOM);
    }
  }
}
const templateManager = new SongList(); // eslint-disable-line
