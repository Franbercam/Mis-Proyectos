"use strict";

import { ratingsAPI } from "/js/api/ratings.js";
import { ratingsRenderer } from "/js/renderers/ratings.js";
import { sessionManager } from '/js/utils/session.js';
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");


function main() {
    let ratBtn1 = document.getElementById("value1");
    ratBtn1.onclick = handleRating1;
    let ratBtn2 = document.getElementById("value2");
    ratBtn2.onclick = handleRating2;
    let ratBtn3 = document.getElementById("value3");
    ratBtn3.onclick = handleRating3;
    let ratBtn4 = document.getElementById("value4");
    ratBtn4.onclick = handleRating4;
    let ratBtn5 = document.getElementById("value5");
    ratBtn5.onclick = handleRating5;
}

function handleRating1(event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append("punctuation", 1);
    formData.append("photoId", photoId);
    formData.append("userId", sessionManager.getLoggedId());

    let answer = confirm("¿Quieres valorar esta foto?");
    if (answer) {
        ratingsAPI.create(formData)
            .then(data => window.location.href = "verFotoG.html?photoId=" + photoId)
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}
function handleRating2(event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append("punctuation", 2);
    formData.append("photoId", photoId);
    formData.append("userId", sessionManager.getLoggedId());

    let answer = confirm("¿Quieres valorar esta foto?");
    if (answer) {
        ratingAPI.create(formData)
            .then(data => window.location.href = "verFotoG.html?photoId=" + photoId)
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}
function handleRating3(event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append("punctuation", 3);
    formData.append("photoId", photoId);
    formData.append("userId", sessionManager.getLoggedId());

    let answer = confirm("¿Quieres valorar esta foto?");
    if (answer) {
        ratingsAPI.create(formData)
            .then(data => window.location.href = "verFotoG.html?photoId=" + photoId)
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}
function handleRating4(event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append("punctuation", 4);
    formData.append("photoId", photoId);
    formData.append("userId", sessionManager.getLoggedId());

    let answer = confirm("¿Quieres valorar esta foto?");
    if (answer) {
        ratingsAPI.create(formData)
            .then(data => window.location.href = "verFotoG.html?photoId=" + photoId)
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}
function handleRating5(event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append("punctuation", 5);
    formData.append("photoId", photoId);
    formData.append("userId", sessionManager.getLoggedId());

    let answer = confirm("¿Quieres valorar esta foto?");
    if (answer) {
        ratingsAPI.create(formData)
            .then(data => window.location.href = "verFotoG.html?photoId=" + photoId)
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}


document.addEventListener("DOMContentLoaded", main);