"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";

const photoRenderer = {
    asCard: function (photo) {
        let html = `<div class="col-md-4">
        <div class="card">
            <a href="photo_detail.html?photoId=${photo.photoId}">
                <img src="${photo.url}" class="card-img-top">
            </a>
            <div class="card-body">
                <h5 class="card-title text-center">${photo.title}</h5>
                <p class="card-text">${photo.description}</p>
                <p class="text-right user-name"> </p>
            </div>
        </div>
    </div>`;
        let card = parseHTML(html);
        loadUsernameCard(card, photo.userId);
        return card;
    },

    asDetails: function (photo) {
        let html = `<div class="photo-details">
         <h3>${photo.title}</h3>
         <h6>${photo.description}</h6>
         <p> Uploaded  by <a href="user_profile.html" class="user-link">
         <span class="user-name"</span> </a> on ${photo.date} </p>
         <hr>
         <img src="${photo.url}" class="img-fluid">
         </div>`;
        let photoDetails = parseHTML(html);
        loadUsernameCard(photoDetails, photo.userId);
        return photoDetails;
    }
};

function loadUsernameCard(card, userId) {
    usersAPI.getById(userId)
        .then(users => {
            let username = users[0].username;
            let p = card.querySelector(".user-name");
            p.textContent = "@" + username;
        });
}

export { photoRenderer };