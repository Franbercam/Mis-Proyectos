"use strict";

const userValidator = {
    validateRegister: function (formData) {
        let errors = [];

        let email = formData.get("email");
        let nombreCompleto = formData.get("name");
        let nombreUsuario = formData.get("user");
        let password = formData.get("password");
        let password2 = formData.get("password2");

        if (nombreCompleto.length < 3 || nombreUsuario < 3) {
            errors.push("Ambas casillas de nombre deben poseer más de 3 caracteres.")
        }
        if (password !== password2) {
            errors.push("Las contraseñas no coinciden.")
        }
        return errors;
    },
    
}

export { userValidator };