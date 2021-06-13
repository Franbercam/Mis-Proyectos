"use strict";

const userValidator = {
    validateRegister: function (formData) {
        let errors = [];

        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let password = formData.get("password");
        let password2 = formData.get("password2");

        if (firstName.length < 3) {
            errors.push("The first should have more than 3 characters");
        }
        if (lastName.length < 3) {
            errors.push("The last name should have more than 3 characters");
        }
        if (password !== password2) {
            errors.push("The passwords must match");
        }
        return errors;
    }
};

export {userValidator};