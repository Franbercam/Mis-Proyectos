"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";

const commentRenderer = {
    asCommentBox: function (comment) {
        let html =`        
        <div class="col-md">
            <div class="usur">
                <h5><a class = "user-name">Usuario:</a></h5>
            </div>
            <div class="usur" id="fecha">
                <h6>${comment.commentDate}</h6>
            </div>
            <div class="container-comment" id="bocComent2">
                <h5>${comment.description}</h5>
            </div>
        </div>        
        `;
        let box = parseHTML(html);
        loadUsernameBox(box, comment.userId);
        return box;
    },

    asCommentGallery: function (comments) {        
        let commentContainer = parseHTML('<div class ="comment-gallery"></div>');

        let row = parseHTML('<div class="row"></div>');
        commentContainer.appendChild(row);

        let counter = 0;

        for( let comment of comments) {
            let card = commentRenderer.asCommentBox(comment);
            row.appendChild(card);
            counter +=1;

            if (counter %1 === 0){
                row = parseHTML('<div class="row"> </div>');
                commentContainer.appendChild(row);
            }
        }
        return commentContainer;       
       
    }
   
};

function loadUsernameBox(box, userId) {
    usersAPI.getById(userId)
        .then(users => {
            let username = users[0].user;
            let p = box.querySelector(".user-name");
            p.textContent = "@" + username;
        });
}

export { commentRenderer }