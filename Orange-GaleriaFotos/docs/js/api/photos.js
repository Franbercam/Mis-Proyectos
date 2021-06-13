"use_strict";

import { BASE_URL, requestOptions } from "./common.js";

const photosAPI = {
    getAll: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/photos`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getById: function (photoId) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/photos/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    create: function (formData) {
        return new Promise(function (resolve, reject) {
            axios.post(`${BASE_URL}/photos`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    update: function (photoId, formData) {
        return new Promise(function (resolve, reject) {
            axios.put(`${BASE_URL}/photos/${photoId}`, formData,
                requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    delete: function (photoId) {
        return new Promise(function (resolve, reject) {
            axios.delete(`${BASE_URL}/photos/${photoId}`,
                requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    // ############################################################################################
    getAllPhotosByUserId: function (userId) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/photos?userId=${userId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getAllPublic: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/photos?visibility=Pública`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getAllPublicCat: function (nameCategory) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/categories/${nameCategory}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getAllCasual: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/photos?visibility=Pública&category=Casual`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getAllFunny: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/photos?visibility=Pública&category=Divertida`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getAllParty: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/photos?visibility=Pública&category=Fiesta`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },


};

export { photosAPI };