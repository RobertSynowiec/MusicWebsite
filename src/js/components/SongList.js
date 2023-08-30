import { templates, select } from '../settings.js';
import { utils } from '../utilis.js';

class SongList {

  constructor(id, data) {

    this.id = id;
    this.data = data;

    console.log(this.id);
    console.log(this.data);

    this.render();

  }

  /*creating the html code (#home) based on the Handlebars template*/
  render() {

    this.songList = document.querySelector(select.containerOf.songs);

    /* html code generation */
    const generatedHTML = templates.songList(this.data);

    /* generating dom element for all tracks */
    const generatedElementDOM = utils.createDOMFromHTML(generatedHTML);

    /* The generated DOM element is added as a new DOM child to the .songList */
    this.songList.appendChild(generatedElementDOM);
  }
}

export default SongList;
