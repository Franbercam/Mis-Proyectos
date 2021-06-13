"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const categoryRenderer = {
    asCard: function (category) {
        let html = `<div class="col-md-4">
        <div class="card">
            <h5 class="btn btn-warning">${category.nameCategory}</h5>
        </div>
    </div>`;
        let card = parseHTML(html);
        return card;
    },
    asCardGallery: function (categories) {
        let galleryContainer = parseHTML('<div class="photo-gallery"></div>');
        let row = parseHTML('<div class="row"></div>');
        galleryContainer.appendChild(row);
        let counter = 0;
        for (let category of categories) {
            let card = categoryRenderer.asCard(category);
            row.appendChild(card);
            counter += 1;
            if (counter % 1 === 0) {
                row = parseHTML('<div class="row"></div>');
                galleryContainer.appendChild(row);
            }
        }
        return galleryContainer;
    },

    galleryCategory: function (categories) {
        let drop = document.querySelector("#cat");
        let drop2 = document.querySelector("#cat2");
        for (let category of categories){
            drop.appendChild(this.RC(category));
            drop2.appendChild(this.RC(category));
        }
    },

    RC: function(category) {
        let html = `<a class="dropdown-item" href="index.html?nameCategory=${category.nameCategory}" id="navbar-myphotos">${category.nameCategory}</a>`;
        let card = parseHTML(html);
        return card;
    },

    galleryCategoryForm: function (categories) {
        let drop = document.querySelector("#input-category");
        for (let category of categories){
            drop.appendChild(this.RCForm(category));
        }
    },

    RCForm: function(category) {
        let html = `<option value="${category.nameCategory}">${category.nameCategory}</option>`;
        let card = parseHTML(html);
        return card;
    }

};

export { categoryRenderer }