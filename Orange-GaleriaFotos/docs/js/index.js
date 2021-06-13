"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { photosAPI } from "/js/api/photos.js";
import { sessionManager } from '/js/utils/session.js';
import { categoriesAPI } from "/js/api/categories.js";
import { categoryRenderer } from "/js/renderers/categories.js";

let urlParams = new URLSearchParams(window.location.search);
let catName = urlParams.get("nameCategory");


function main() {
    
    hideColumns();

    categoriesAPI.getAll()
        .then(categories => {
            categoryRenderer.galleryCategory(categories);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    if (catName == null) {
        galleryContainer();
    } else  {
        galleryContainerCat(catName);
    }


}

function galleryContainerCat() {
    let galleryContainer = document.querySelector("div.container");
    photosAPI.getAllPublicCat(catName)
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function galleryContainer() {
    let galleryContainer = document.querySelector("div.container");
    photosAPI.getAllPublic()
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}





function hideColumns() {

    let login = document.getElementById("fila-Login");
    let noLogin = document.getElementById("fila-noLogin");

    if (sessionManager.isLogged()) {
        noLogin.style.display = "none";

    } else {
        login.style.display = "none";

    }

};

document.addEventListener("DOMContentLoaded", main);