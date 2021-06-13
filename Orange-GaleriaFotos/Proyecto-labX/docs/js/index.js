"use strict";

//import { photoRenderer } from "/js/renderers/photos.js";
//import { galleryRenderer } from "/js/renderers/gallery.js";
import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";

document.addEventListener("DOMContentLoaded", main);

function main() {
    // add a card
    /*
    let photo = {
        title: "Samoyed",
        description: "A very good boy.",
        userId: "@user2",
        url: "https://i.ibb.co/tY1Jcnc/wlZCfCv.jpg",
    };
    let container = document.querySelector("div.container");
    let card = photoRenderer.asCard(photo);
    container.appendChild(card);
    */

    // add a gallery
    /*let photos = [
        {
            title: "Samoyed",
            description: "A very good boy.",
            userId: "@user1",
            url: "https://i.ibb.co/tY1Jcnc/wlZCfCv.jpg",
        },
        {
            title: "AC DC",
            description: "Rock N Roll God.",
            userId: "@user2",
            url: "https://los40.com/los40/imagenes/2020/11/11/los40classic/1605134977_487335_1605135272_gigante_normal.jpg",
        },
        {
            title: "Matalascañas",
            description: "Doñana.",
            userId: "@user3",
            url: "https://fotos.hoteles.net/articulos/playa-matalascanas-huelva-2897-1.jpg",
        },
        {
            title: "Spanish tortilla",
            description: "With onion",
            userId: "@user2",
            url: "https://comidasespanolas.com/wp-content/uploads/2019/12/Receta-de-tortilla-espa%C3%B1ola-tradicional.jpg",
            date: "01/01/2021",
        },
        {
            title: "Seville",
            description: "The  beautiful  city of  Seville",
            userId: "@user3", 
            url: "https://urbansevilla.es/wp-content/uploads/2019/03/urban-sevilla-foto-ciudad.jpg",
            date: "03/02/2019",
        },
        {
            title: "Abstract  art",
            description: "Clipart",
            userId: "@user4",
            url: "https://clipartart.com/images/worst-clipart-ever-1.jpg",
            date: "14/08/2019",
        },
    ];
    let container = document.querySelector("div.container");
    let gallery = galleryRenderer.asCardGallery(photos);
    container.appendChild(gallery);
*/

    let galleryContainer = document.querySelector("div.container");

    photosAPI.getAll().then(photos => {
        let gallery = galleryRenderer.asCardGallery(photos);
        galleryContainer.appendChild(gallery);
    })
        .catch(error => messageRenderer.showErrorMessage(error));

    let cards = document.querySelectorAll("div.card");
    for (let card of cards) {
        card.onmouseenter = handleMouseEnter;
        card.onmouseleave = handleMouseLeave;
    }
}

document.addEventListener("DOMContentLoaded", main);

function handleMouseEnter(event) {
    let card = event.target;
    card.style.backgroundColor = "black";
    card.style.color = "white";
    card.style.border = "2px dotted red";
}

function handleMouseLeave(event) {
    let card = event.target;
    card.style.backgroundColor = "white";
    card.style.color = "black";
    card.style.border = "";
}
