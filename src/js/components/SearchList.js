import { templates, select } from '../settings.js';
import { dataSource } from '../data.js';
import { utils } from '../utilis.js';
import { app } from '../app.js';

class SearchList {

  constructor() {

    //const filterSong = [];

    this.getElement();
    this.initSearch();
    this.initData();
    this.render();
    app.initPlayer();
  }
  getElement() {

    this.searchList = document.querySelector(select.containerOf.search);
    console.log('this.searchList ', this.searchList);


  }
  initSearch() {

    /* DOMContentLoaded waits for the entire DOM (Document Object Model) to be loaded, which ensures that the JavaScript code doesn't try to run until the page is fully loaded.*/

    document.addEventListener('DOMContentLoaded', function () {
      const searchForm = document.getElementById(select.search.form);
      const searchInput = document.getElementById(select.search.input);
      const resultsList = document.getElementById(select.search.result);
      console.log('searchForm ', searchForm);
      console.log('searchInput ', searchInput);
      console.log('resultsList', resultsList);


      searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const searchTerm = searchInput.value.toLowerCase();
        resultsList.innerHTML = '';

        console.log('searchTerm', searchTerm);

        const matchingFiles = [];
        console.log('matchingFiles', matchingFiles);
        dataSource.songs.forEach(song => {
          const fileName = song.filename;
          console.log(fileName);
          if (fileName.toLowerCase().includes(searchTerm)) {
            matchingFiles.push(fileName);
          }
        });

        displayResults(matchingFiles);
      });

      function displayResults(files) {
        if (files.length === 0) {
          resultsList.innerHTML = '<p>Nie znaleziono pasujących plików.</p>';
        } else {
          files.forEach(file => {
            const listItem = document.createElement('li');
            listItem.textContent = file;
            resultsList.appendChild(listItem);
          });
        }
      }
    });
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
      this.searchList.appendChild(generatedElementDOM);


    }
  }
}
const templateManager = new SearchList(); // eslint-disable-line
console.log(templateManager);