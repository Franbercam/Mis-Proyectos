"use strict";

import { photosAPI } from "/js/api/photos.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";

let photoId = urlParams.get("photoId");

function main(){

    
    let registerForm = document.getElementById("form-photo-upload");
    registerForm.onsubmit = handleSubmitPhoto;

    let photoContainer = document.querySelector("#foto");
    photosAPI.getById(photoId)
        .then(photos => {
            let photoDetails = photoRenderer.asDetails(photos[0]);
            photoContainer.appendChild(photoDetails);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

}

function handleSubmitPhoto(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    //Id Frabercam, mientras no exista logueo
    formData.append("userId", 3);

    photosAPI.create(formData)
        .then(data => window.location.href = "index.html")
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);