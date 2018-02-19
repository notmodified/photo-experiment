import "./app.scss"
import "babel-polyfill";

import { info, api, profile, imageUrl } from "./flickr.js"

import mi from "mithril"
import { app } from "./ui.js"
const R = require("ramda")

document.addEventListener("DOMContentLoaded", async () => {
  const photos = await fetch(api())
    .then(r => r.json())
    .then(R.path(["photos", "photo"]))

  const addPhotoInfo = i =>
    new Promise((res, rej) => {
      fetch(info(i.id))
        .then(r => r.json())
        .then(r => r.photo)
        .then(r => res(R.assoc("info", r, i)));
    })

  const addThumbs = i => R.assoc("thumb", imageUrl(i), i)

  const withInfo = await Promise.all(R.map(addPhotoInfo)(photos))

  const withThumbs = R.map(addThumbs)(withInfo);

  mi.render(document.body, mi(app, { images: withThumbs }))
})
