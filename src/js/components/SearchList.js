import { templates, select } from '../settings.js';
import { dataSource } from '../data.js';
import { utils } from '../utilis.js';
import { app } from '../app.js';

{
  ('use strict');
  class SearchList {

    constructor() {

      this.getElement();
      this.initSearch();
      this.matchingFiles = [];


    }
    getElement() {

      this.searchList = document.querySelector(select.containerOf.search);

    }
    clearTablematchingFiles() { // clears matchingFiles arrays before next search
      this.matchingFiles = [];

    }
    clearHangelbarsContainer() {
      this.searchList.innerHTML = '';
    }

    initSearch() {

      /* DOMContentLoaded waits for the entire DOM (Document Object Model) to be loaded, which ensures that the JavaScript code doesn't try to run until the page is fully loaded.*/

      document.addEventListener('DOMContentLoaded', () => {
        const searchForm = document.getElementById(select.search.form);
        const searchInput = document.getElementById(select.search.input);
        const resultsList = document.getElementById(select.search.result);


        searchForm.addEventListener('submit', (event) => {
          event.preventDefault();
          /* Retrieving the entered query in form search and changing it to lowercase */
          const searchTerm = searchInput.value.toLowerCase();

          /* Clearing results before starting a new search */
          resultsList.innerHTML = '';
          this.clearTablematchingFiles();
          this.clearHangelbarsContainer();

          /* iterating through the dataSource.songs array,
            checking if the entered query is in array,
            If the condition is true (the file name contains the entered query), the file name is added to the array */
          dataSource.songs.forEach(song => {
            const fileName = song.name + ' ' + song.title;
            console.log(fileName);
            if (fileName.toLowerCase().includes(searchTerm)) {
              this.matchingFiles.push(song);
            }

          });
          this.render();
          app.initPlayer(select.containerOf.search);
          /* calling displayResults function */
          displayResults(this.matchingFiles);
        });

        /* Filtering filenames in the this.matchingFiles array */

        function displayResults(files) {
          if (files.length === 0) {
            resultsList.innerHTML = '<p>We didn\'t find the songs</p>';
          } else {
            resultsList.innerHTML = '<p>We have found ' + files.length + ' songs.</p>';
          }
        }
      });
    }
    render() {

      /* iterating over all songs in this.matchingFiles */
      for (let elem of this.matchingFiles) {
        /* html code generation */
        const generatedHTML = templates.songList(elem);

        /* generating dom element for find tracks */
        const generatedElementDOM = utils.createDOMFromHTML(generatedHTML);
        console.log('generatedElementDOM ', generatedElementDOM);

        /* The generated DOM element is added as a new DOM child to the searchList */
        this.searchList.appendChild(generatedElementDOM);

      }
    }
  }
  const templateManager = new SearchList(); // eslint-disable-line
}