import "./app.scss";
import "babel-polyfill";
import "whatwg-fetch";

import { info, api, imageUrl } from "./flickr.js";

import { app } from "./ui.js";
const R = require("ramda");

document.addEventListener("DOMContentLoaded", async () => {
  const photos = await fetch(api())
    .then(r => r.json())
    .then(R.path(["photos", "photo"]));

  const addPhotoInfo = i =>
    new Promise((res, rej) => {
      fetch(info(i.id))
        .then(r => r.json())
        .then(r => r.photo)
        .then(r => res(R.assoc("info", r, i)));
    });

  const addThumbs = i => R.assoc("thumb", imageUrl(i), i);

  const withInfo = await Promise.all(R.map(addPhotoInfo)(photos));

  const withThumbs = R.map(addThumbs)(withInfo);

  document.body.appendChild(app(withThumbs));
});
