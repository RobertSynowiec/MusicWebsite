/*eslint no-empty: "error"*/
import { select } from '../settings.js';

class FilterCategories {

    constructor(data) {

        this.allcategories = [];
        console.log('this.allcategories ', this.allcategories);

        this.data = data;

        console.log(' this data', this.data);


        this.filterCategories();

    }
    filterCategories() {
        for (let songData in this.data.songs) {

            const song = this.data.songs[songData];

            for (let category of song.categories) {

                if (this.allcategories.includes(category)) {
                    // empty
                } else {
                    this.allcategories.push(category);

                }
            }

        }
        this.addLinkAllCategorie();
    }
    addLinkAllCategories() {

        const categoriesWrapper = document.querySelector(select.containerOf.categories);

        categoriesWrapper.innerHTML = '';
        console.log('this.allcategories ', this.allcategories);


        /*Iterate through the array and create links categories*/
        this.allcategories.forEach((category) => {
            let link = document.createElement('a');

            link.href = category;

            link.textContent = category;

            var listItem = document.createElement('li');
            listItem.appendChild(link);

            categoriesWrapper.appendChild(listItem);
        });

    }
}
export default FilterCategories;