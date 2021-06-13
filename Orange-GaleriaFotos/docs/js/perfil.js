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
    let userId = sessionManager.getLoggedUser().userId;
    console.log(userId);
    photosAPI.getAllPhotosByUserId(userId)
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function showUser() {
    let title = document.getElementById("perfil-username");
    let text;

    if (sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().user;
        text = username;
    } else {
        text = "Orange";
    }

    title.textContent = text;
}

function showName() {
    let title = document.getElementById("perfil-name");
    let text;

    if (sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().name;
        text = username;
    } else {
        text = "Orange";
    }

    title.textContent = text;

}

function showAvatarURL() {
    let title = document.getElementById("perfil-avatarURL");
    let text;

    if (sessionManager.isLogged()) {
        let avatarURL = sessionManager.getLoggedUser().avatarURL;
        text = "AvatarURL predeterminada";
    } else {
        text = "Orange";
    }

    title.textContent = text;

}

function showEmail() {
    let title = document.getElementById("perfil-email");
    let text;

    if (sessionManager.isLogged()) {
        let email = sessionManager.getLoggedUser().email;
        text = email;
    } else {
        text = "Orange";
    }

    title.textContent = text;

}

function showTelephone() {
    let title = document.getElementById("perfil-telephone");
    let text;

    if (sessionManager.isLogged()) {
        let telephone = sessionManager.getLoggedUser().telephone;
        text = telephone;
    } else {
        text = "Orange";
    }

    title.textContent = text;

}

document.addEventListener("DOMContentLoaded", main);