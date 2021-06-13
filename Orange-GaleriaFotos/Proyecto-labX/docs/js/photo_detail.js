"use  strict";

import { photosAPI } from "/js/api/photos.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main() {
    let photoContainer = document.querySelector("#photo-details-column");

    photosAPI.getById(photoId).then(photos => {
        let photoDetails = photoRenderer.asDetails(photos[0]);
        photoContainer.appendChild(photoDetails);
    })
        .catch(error => messageRenderer.showErrorMessage(error));

    let deleteBtn = document.querySelector("#button-delete");
    deleteBtn.onclick = handleDelete;

    let editBtn = document.querySelector("#button-edit")
    editBtn.onclick = handleEdit;

    hideActionsColumn();

}

function handleDelete(event) {
    let answer = confirm("Do you  really  want to  delete  this  photo?");

    if (answer) {
        photosAPI.delete(photoId)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

function handleEdit(event) {
    window.location.href = "edit_photo.html?photoId=" + photoId;
};

function hideActionsColumn() {
    let actions_col = document.getElementById("actions-col");
    if (!sessionManager.isLogged()) {
        actions_col.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);