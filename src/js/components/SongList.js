import { templates, select, classFor } from '../settings.js';
import { dataSource } from '../data.js';
import { utils } from '../utilis.js';

class SongList {

  constructor() {

    this.getElement();
    this.initData();
    this.render();
    this.initPlayer();
  }
  getElement() { //

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
  initPlayer() {

    document.addEventListener('DOMContentLoaded', function () {
            GreenAudioPlayer.init({ // eslint-disable-line
        selector: classFor.player,
        stopOthersOnPlay: true
      });

            GreenAudioPlayer.init({ // eslint-disable-line
        selector: classFor.playerDownload,
        stopOthersOnPlay: true,
        showDownloadButton: true,
        enableKeystrokes: true
      });

            GreenAudioPlayer.init({ // eslint-disable-line
        selector: classFor.playerAccessibility,
        stopOthersOnPlay: true,
        enableKeystrokes: true
      });
    });

  }
}
const templateManager = new SongList(); // eslint-disable-line
