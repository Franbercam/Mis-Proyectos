"use strict";

import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

function main() {
    if (photoId !== null) {
        loadCurrentPhoto();
    }

    let registerForm = document.getElementById("form-photo-upload");
    registerForm.onsubmit = handleSubmitPhoto;

}

function handleSubmitPhoto(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    
    if (currentPhoto  ===  null) { //  Creating a new  photo
         // Add the  current  user's ID
         formData.append("userId", sessionManager.getLoggedId ());
        }

    if (currentPhoto === null) {  //  Creating a new  photo
        // Add the  current  user's ID
        formData.append("userId", 1);

        photosAPI.create(formData)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    } else { //  Updating  an  existing  photo
        formData.append("userId", currentPhoto.userId);
        formData.append("date", currentPhoto.date);

        photosAPI.update(photoId, formData)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorAsAlert(error));
    }
}

function loadCurrentPhoto() {
    let pageTitle = document.getElementById("page-title");
    let urlInput = document.getElementById("input-url");
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    let visibilityInput = document.getElementById("input-visibility");

    pageTitle.textContent = "Editing a photo";

    photosAPI.getById(photoId)
        .then(photos => {
            currentPhoto = photos[0];
            urlInput.value = currentPhoto.url;
            titleInput.value = currentPhoto.title;
            descriptionInput.value = currentPhoto.description;
            visibilityInput.value = currentPhoto.visibility;
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);