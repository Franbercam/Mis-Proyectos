"use strict";

const commentValidator = {
    validateComment: function (formData) {
        let errors = [];

        let description = formData.get("comment");

        if (description < 3){
            errors.push("El comentario debe tener al menos 3 caracteres.")
        }
        return errors;
    }
}

export { commentValidator }