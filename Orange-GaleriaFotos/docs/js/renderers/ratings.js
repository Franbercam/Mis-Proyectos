"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const ratingsRenderer = {
  asRatings: function (ratings) {
    let html = `<div class="col-md-4>
                  <div class="card">
                        <div class="card-body">
                          <h5 class ="card-title text-center">${ratings.date}</h5>
                          <p class="card-text">${ratings.punctuation}></p>
                        </div>
                  </div>
                </div>`;

    let rating = parseHTML(html);
    return rating;
  },

  asRatingsDetails: function (ratings) {
    return ratings.punctuation;
  },

  asTotal: function (valores) {
    let contador = 0;
    let totalValoraciones = 0;
    let media = null;
    if (valores != null) {
      for (let valor of valores) {
        totalValoraciones = totalValoraciones + this.asRatingsDetails(valor);
        contador += 1;
      }

       media = totalValoraciones / contador;

    } else {
       media = 0;
    }

    let html = `<p>Valoracion:${media}</p>`;
    let ret = parseHTML(html);
    return ret;

  }

};

export { ratingsRenderer };
