import { templates, select, classFor } from '../settings.js';
import { utils } from '../utilis.js';
import { app } from '../app.js';

class SearchList {

  constructor(data) {

    this.data = data;

    this.arrayCategories = [];

    this.getElement();
    this.initDataCategories();
  }

  getElement() {

    this.searchList = document.querySelector(select.containerOf.search);

  }
  initDataCategories() {
    // iterate over all songs
    for (let songData in this.data.songs) {
      // assign song to song constant
      const song = this.data.songs[songData];

      // iterate over all categories
      for (let category of song.categories) {

        // if the this.all Categories array contains categories, do nothing
        if (this.arrayCategories.includes(category)) {
          // empty
        } else {

          // if not include add
          this.arrayCategories.push(category);

        }
      }
    }
    this.initCategories();
  }
  initCategories() {
    const selectInput = document.getElementById(select.search.select);

    // Creating an empty option
    const emptyOption = document.createElement('option');

    // Set the text displayed to the user
    emptyOption.textContent = '-- select --';
    emptyOption.value = '';

    // Add an empty option to the top of the list
    selectInput.appendChild(emptyOption);

    // Add other options
    const options = this.arrayCategories;

    options.forEach((options) => {
      const listItem = document.createElement('option');
      listItem.textContent = options;
      listItem.value = options;
      selectInput.appendChild(listItem);



    });
    this.initSearch();
  }
  initSearch() {

    /* DOMContentLoaded waits for the entire DOM (Document Object Model) to be loaded, which ensures that the JavaScript code doesn't try to run until the page is fully loaded.*/

    document.addEventListener('DOMContentLoaded', () => {
      const searchForm = document.getElementById(select.search.form);
      const searchInput = document.getElementById(select.search.input);
      const selectInput = document.getElementById(select.search.select);
      const resultsList = document.getElementById(select.search.result);

      searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        /* get audio id */
        let players = document.querySelectorAll(classFor.audio);

        /* stop and reset all players */
        for (let i = 0; i < players.length; i++) {
          GreenAudioPlayer.pausePlayer(players[i]); // eslint-disable-line
          players[i].currentTime = 0;
        }

        /* Retrieving the entered query in form search and changing it to lowercase */
        const searchTerm = searchInput.value.toLowerCase();
        const searchSelectTerm = selectInput.value.toLowerCase();

        /* Clearing results before starting a new search */
        resultsList.innerHTML = '';
        this.matchingFiles = [];
        this.searchList.innerHTML = '';

        /* iterating through the dataSource.songs array,
          checking if the entered query is in array,
          If the condition is true (the file name contains the entered query), the file name is added to the array */
        this.data.songs.forEach(song => {

          const fileName = song.name + ' ' + song.title;

          for (let category of song.categories) {

            this.category = category;

            if (fileName.toLowerCase().includes(searchTerm) && this.category.toLowerCase().includes(searchSelectTerm)) {
              this.matchingFiles.push(song);
              break;
            }
          }

        });
        this.render();
        displayResults(this.matchingFiles);
        app.initPlayer(select.containerOf.search);

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

      /* The generated DOM element is added as a new DOM child to the searchList */
      this.searchList.appendChild(generatedElementDOM);

    }
  }
}
export default SearchList;