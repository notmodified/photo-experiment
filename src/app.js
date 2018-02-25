import "./app.scss";
import "babel-polyfill";
import "whatwg-fetch";

import Colorer from "./color.worker.js";
import { info, api, tileUrl, imageUrl, fullImageUrl } from "./flickr.js";

import { draw } from "./ui.js";
const R = require("ramda");

const thumbs = async (q = "mosaic") => {
  const photos = await fetch(api(q))
    .then(r => r.json())
    .then(R.path(["photos", "photo"]));

  const addPhotoInfo = i =>
    new Promise((res, rej) => {
      fetch(info(i.id))
        .then(r => r.json())
        .then(r => r.photo)
        .then(r => res(R.assoc("info", r, i)));
    });

  const addThumbs = R.unnest(R.compose(R.assoc("thumb"), tileUrl));

  const addThumbBlob = i =>
    new Promise(res => {
      fetch(i.thumb)
        .then(r => r.blob())
        .then(r => {
          const img = new Image();
          img.src = URL.createObjectURL(r);
          res(R.assoc("thumb", img.src, i));
        });
    });

  const withInfo = await Promise.all(R.map(addPhotoInfo)(photos));

  const withThumbs = R.map(addThumbs)(withInfo);

  const withThumbBlobs = await Promise.all(R.map(addThumbBlob)(withThumbs));

  return withThumbBlobs;
};

document.addEventListener("DOMContentLoaded", async () => {
  let root;

  root = draw({ loading: true, images: [] }, document.body, root);

  let t = await thumbs();
  const colorer = new Colorer();

  colorer.addEventListener("message", ({ data: { avgColor, src } }) => {
    const i = R.findIndex(R.propEq("thumb", src), t);
    t[i] = R.assoc("avgColor", avgColor, t[i]);

    root = draw({ images: t, click }, document.body, root);
  });

  const colorCanvas = document.createElement("canvas");
  const colorCtx = colorCanvas.getContext("2d");

  const avgColors = (ctx, { thumb }) => {
    const img = new Image();
    img.src = thumb;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const idata = ctx.getImageData(0, 0, img.width, img.height);
      colorer.postMessage({ data: idata, src: thumb });
    };
  };

  R.forEach(R.curry(avgColors)(colorCtx), t);

  const click = e => {
    root = draw(
      { images: t, click, current: fullImageUrl(e), open: true },
      document.body,
      root
    );
  };

  root = draw({ images: t, click }, document.body, root);
});
