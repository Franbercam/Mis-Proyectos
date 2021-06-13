"use strict";

import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { sessionManager } from "/js/utils/session.js";

function main() {
    galleryContainer();
    showUser();
    showName();
    showAvatarURL();
    showEmail();
    showTelephone();

}

function galleryContainer() {
    let galleryContainer = document.querySelector("div.container");
    photosAPI.getAllPhotosByUserId(1)
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function showUser() {
    let title = document.getElementById("perfil-username");
    title.textContent = "Pedrodort";
}

function showName() {
    let title = document.getElementById("perfil-name");
    title.textContent = "Pedro";

}

function showAvatarURL() {
    let title = document.getElementById("perfil-avatarURL");
    title.textContent = "images/P Pedro.jpeg";

}

function showEmail() {
    let title = document.getElementById("perfil-email");
    title.textContent = "pedrodort@alumn.us.es";

}

function showTelephone() {
    let title = document.getElementById("perfil-telephone");
    title.textContent = "612345678";

}

document.addEventListener("DOMContentLoaded", main);