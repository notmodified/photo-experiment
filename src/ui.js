const R = require("ramda");

import Modal from "./modal";
import { photo } from "./photo";
import { load } from "./load";

const {
  createElement,
  article,
  button,
  div,
  ul,
  li,
  span,
  a,
  img
} = require("preact-hyperscript");
const { Component, render } = require("preact");

const h = createElement;

export const photoList = ({ images, click, current, open, loading = false }) =>
  loading
    ? load()
    : div(".app", [
        h(Modal, { images, current, open }),
        div({ className: "photo-list" }, R.map(R.curry(photo)(click), images))
      ]);

export const draw = (props, el, root) => render(h(photoList, props), el, root);
