"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { authAPI } from "/js/api/auth.js";

function main() {
    addSendLogin();

}

function addSendLogin() {
    let loginForm = document.getElementById("login-form");
    loginForm.onsubmit = sendLogin;
}

function sendLogin(event){
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    authAPI.login(formData)
    .then(loginData => {
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.user;
        sessionManager.login(sessionToken, loggedUser);
        window.location.href = "index.html";
    })
    .catch(error => messageRenderer.showErrorMessage(error));

}   


document.addEventListener("DOMContentLoaded", main);