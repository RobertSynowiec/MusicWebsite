/*eslint no-empty: "error"*/
import { classNames, select } from '../settings.js';

class FilterCategories {

  constructor(data) {

    this.allCategories = [];
    this.data = data;
    this.filterCategories();
    this.addLinkAllCategories();

  }
  filterCategories() {

    // iterate over all songs
    for (let songData in this.data.songs) {

      // assign song to song constant
      const song = this.data.songs[songData];

      // iterate over all categories
      for (let category of song.categories) {

        // if the this.all Categories array contains categories, do nothing
        if (this.allCategories.includes(category)) {
          // empty
        } else {

          // if not include add
          this.allCategories.push(category);

        }
      }
    }
  }
  addLinkAllCategories() {

    // find category list wrapper
    const categoriesWrapper = document.querySelector(select.containerOf.categories);

    // clear category list wrapper
    categoriesWrapper.innerHTML = '';

    /* iterate through the array and create links categories*/
    this.allCategories.forEach((category) => {

      //createElement a
      let link = document.createElement('a');

      //create a link for all categories
      link.href = '#' + category;

      //assign all categories to link.textContent
      link.textContent = category;

      //create a li element for each category
      const listItem = document.createElement('li');
      listItem.appendChild(link);

      //put all links on the page
      categoriesWrapper.appendChild(listItem);
    });
    this.filterClickHangler();
  }
  filterClickHangler() {
    this.linksCategories = document.querySelectorAll(select.containerOf.categoriesLink);


    // iterate over all category links
    for (let linkCategory of this.linksCategories) {

      // listen for clicking on the link
      linkCategory.addEventListener('click', (event) => {

        if (!linkCategory.classList.contains(classNames.nav.active)) {

          // set the styles of the clicked link
          linkCategory.style.color = 'red';
          linkCategory.style.fontWeight = 'bold';
          linkCategory.classList.add(classNames.nav.active);

          // Restore the default color for the rest of the items
          this.linksCategories.forEach(function (otherLink) {
            if (otherLink !== linkCategory) {
              otherLink.style.color = '#fff';
              otherLink.style.fontWeight = 'normal';
              otherLink.classList.remove(classNames.nav.active);

            }
          });

          // assign the clicked element to the clickedElement constant
          const clickedElement = event.currentTarget;

          // get the href attribute from the clicked item
          const href = clickedElement.getAttribute('href');

          // delete #
          this.category = href.replace('#', '');

          // find all player divs with category description
          const paragrafs = document.querySelectorAll(select.containerOf.homePalayerCategories);

          // iterate over all divs
          for (let paragraf of paragrafs) {

            // check if the paragraph exists and is not null or undefined)
            if (paragraf) {

              // if the condition is met, download the text content
              this.tekstParagrafu = paragraf.textContent;

              // find all div players
              this.divPlayers = document.querySelectorAll(select.containerOf.homePalayer);


              // Iterate through all divs and check the content
              for (let i = 0; i < this.divPlayers.length; i++) {

                //assign single player divs
                const div = this.divPlayers[i];

                // check the content div
                const contentDiv = div.textContent;

                // If the content of the div doesn't contain search clicked category, hide it
                if (!contentDiv.includes(this.category)) {
                  div.classList.add('hidden');

                } else {
                  // If the content of the div contains clicked category, hide it
                  div.classList.remove('hidden');

                }
              }
            }
          }
        } else {

          // find all div players
          this.divPlayers = document.querySelectorAll(select.containerOf.homePalayer);


          // Iterate through all divs and check the content
          for (let i = 0; i < this.divPlayers.length; i++) {

            //assign single player divs
            const div = this.divPlayers[i];

            // If div contain hide remove all class hidden
            if (div.classList.contains(classNames.pages.hidden)) {
              div.classList.remove(classNames.pages.hidden);

            } else {
              // empty
            }
          }
        }
      });
    }
  }
}
export default FilterCategories;