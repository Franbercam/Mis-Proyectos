"use  strict";

import { sessionManager } from "/js/utils/session.js";

function main() {
    showUser();
    addLogoutHandler();
    hideHeaderOptions();
}

function showUser() {
    let title = document.getElementById("navbar-title");
    let text;

    if (sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().username;
        text = "Hi , @" + username;
    } else {
        text = "Anonymous";
    }

    title.textContent = text;
}

function addLogoutHandler() {
    let logoutButton = document.getElementById("navbar-logout");

    logoutButton.addEventListener("click", function () {
        sessionManager.logout();
        window.location.href = "index.html";
    });
}

function hideHeaderOptions() {
    let headerRegister = document.getElementById("navbar-register");
    let headerLogin = document.getElementById("navbar-login");
    let headerLogout = document.getElementById("navbar-logout");
    let headerRecent = document.getElementById("navbar-recent");
    let headerCreate = document.getElementById("navbar-create");
    if (sessionManager.isLogged()) {
        headerRegister.style.display = "none"; headerLogin.style.display = "none";
    } else {
        headerRecent.style.display = "none";
        headerCreate.style.display = "none";
        headerLogout.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", main);