const R = require("ramda");

export const perPage = 100;

const key = "51a9f6e2f76d707dfbed602811e9d911";

export const api = (q = "cats") =>
  `https://api.flickr.com/services/rest?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=${key}&safe_search=1&text=${encodeURIComponent(
    q
  )}&per_page=${perPage}&page=1`;

export const profile = (uid) =>
  `https://api.flickr.com/services/rest?method=flickr.profile.getProfile&format=json&nojsoncallback=1&api_key=${key}&user_id=${uid}`

export const info = (pid) =>
  `https://api.flickr.com/services/rest?method=flickr.photos.getInfo&format=json&nojsoncallback=1&api_key=${key}&photo_id=${pid}`

const pImageUrl = (s, { farm, server, id, secret }) =>
  `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${s}.jpg`;

export const imageUrl = R.curry(pImageUrl)("t");
