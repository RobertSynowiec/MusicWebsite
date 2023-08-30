import { templates, select } from '../settings.js';
import { utils } from '../utilis.js';
import { app } from '../app.js';

class RandomSong {

  constructor(data) {

    this.data = data;
    this.randomSongArray = [];

    this.getElement();

  }
  getElement() {

    this.discoverList = document.querySelector(select.containerOf.discover);
    this.randomSong();
  }
  randomSong() {

    /* Randomly pick a song from the array */

    const randomIndex = Math.floor(Math.random() * this.data.length);
    console.log(randomIndex);
    const selectedSong = this.data[randomIndex];
    this.randomSongArray.push(selectedSong);

    this.render();
    app.initPlayer(select.containerOf.discover);

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
export default RandomSong;
