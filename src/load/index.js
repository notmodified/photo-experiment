const R = require("ramda");
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

import "./index.scss";

export const load = () =>
  h("div", { className: "load" }, [
    h("svg", { height: "5rem", width: "5rem", viewBox: "0 0 105 105" }, [
      h("g", { fill: "black" }, [
        h("rect", { x: 0, y: 0, width: 50, height: 50 }),
        h("rect", { x: 55, y: 0, width: 50, height: 50 }),
        h("rect", { x: 0, y: 55, width: 50, height: 50 }),
        h("rect", { x: 55, y: 55, width: 50, height: 50 })
      ])
    ])
  ]);
