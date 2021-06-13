"use strict";

import { categoriesAPI } from "/js/api/categories.js";
import { categoryRenderer } from "/js/renderers/categories.js";
import { messageRenderer } from "/js/renderers/messages.js";


function main(){
    let categoryForm = document.getElementById("category-form");
    categoryForm.onsubmit = handleCategory;

    
    let categoriesContainer = document.getElementById("verCategorias");
    categoriesAPI.getAll()
        .then(categories => {
            let box = categoryRenderer.asCardGallery(categories);            
            categoriesContainer.appendChild(box);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    
}

function handleCategory(event){
    event.preventDefault();

    let form = event.currentTarget;
    let formData = new FormData(form);

    categoriesAPI.create(formData)
        .then(data =>{window.location.href="añadirCategoria.html"})
        .catch(error => messageRenderer.showErrorMessage(error));

}

document.addEventListener("DOMContentLoaded", main);