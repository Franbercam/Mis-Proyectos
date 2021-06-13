"use strict";

//photo_details.js

import { commentsAPI } from "/js/api/comments.js";
import { commentRenderer } from "/js/renderers/comments.js";
import { photosAPI } from "/js/api/photos.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from '/js/utils/session.js';
import { ratingsRenderer } from "./renderers/ratings.js";
import { ratingsAPI } from "/js/api/ratings.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main() {

    showAverage();
    
    addHandleComment();

    let commentsContainer = document.getElementById("containerComment");
    commentsAPI.getAllCommentByPhotoId(photoId)
        .then(comments => {
            let box = commentRenderer.asCommentGallery(comments);
            commentsContainer.appendChild(box);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    let photoContainer = document.querySelector("#foto");
    photosAPI.getById(photoId)
        .then(photos => {
            let photoDetails = photoRenderer.asDetails(photos[0]);
            photoContainer.appendChild(photoDetails);
            hideButtons(photos[0].userId);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    let deleteBtn = document.getElementById("deleteBotton");
    deleteBtn.onclick = handleDelete;

    let editBtn = document.getElementById("editBotton")
    editBtn.onclick = handleEdit;  
    
}

function addHandleComment() {
    let commentForm = document.getElementById("comment-form");
    commentForm.onsubmit = handleComment;
}

function handleComment(event) {
    event.preventDefault();

    let form = event.currentTarget;
    let formData = new FormData(form);
    
    
    let uId = sessionManager.getLoggedId();
    formData.append("userId", uId);
    formData.append("photoId", photoId);
    commentsAPI.create(formData)
        .then(data =>{window.location.href="verFotoG.html?photoId=" + photoId })
        .catch(error => messageRenderer.showErrorMessage(error));
    
}

function showAverage(event) {
   let average = document.getElementById("puntuacion");
   ratingsAPI.getById(photoId)
    .then(ratings => {
        console.log(ratings);
        let ratingsDetails = ratingsRenderer.asTotal(ratings);
        average.appendChild(ratingsDetails); 
    })
    .catch(error => {
        let ratingsDetails = ratingsRenderer.asTotal(null);
        average.appendChild(ratingsDetails);
    }
    );
}

function handleDelete(event) {
    let answer = confirm("¿Realmente quieres borrar esta foto?");
    if (answer) {
        photosAPI.delete(photoId)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

function handleEdit(event) {
    window.location.href = "subirFoto.html?photoId=" + photoId;
}

function hideButtons(uId) {

    let botones = document.getElementById("buttons");
    let puntuacion = document.getElementById("corazones");

    if (sessionManager.getLoggedId()!=uId ) {
        botones.style.display = "none";
       // puntuacion.style.display = "none";

    } else {
       
    }
};

document.addEventListener("DOMContentLoaded", main);