"use strict";

import { sessionManager } from "/js/utils/session.js";

function main() {
    showUser();
    addLogoutHandler();
    hideHeaderOptions();

}

function hideHeaderOptions() {

    let uploadPhoto = document.getElementById("upload-photo");
    let headerFriedList = document.getElementById("friends-list");
    let headerMyProfile = document.getElementById("my-profile");
    let headerLogout = document.getElementById("header-logout");

    if (sessionManager.isLogged()) {
        
    } else {
        uploadPhoto.style.display = "none";
        headerMyProfile.style.display = "none";
        headerFriedList.style.display = "none";
        headerLogout.style.display = "none";
    }
}

function addLogoutHandler() {
    let logoutButton = document.getElementById("header-logout");

    logoutButton.onclick = function (event) {
        sessionManager.logout();
        window.location.href = "index.html";
    };
}

function showUser() {
    let title = document.getElementById("navbar-username");
    let text;

    if (sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().user;
        text = username;
    } else {
        text = "Orange";
    }

    title.textContent = text;
}



document.addEventListener("DOMContentLoaded", main);