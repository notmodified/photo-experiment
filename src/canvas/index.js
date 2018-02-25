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

import Averager from "../averager.worker.js";
import Sorter from "../sorter.worker.js";


export default class Canvas extends Component {

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const canvas = document.createElement('canvas');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.canvas.width = 500;
    this.canvas.height = 500;
    this.ctx.fillStyle = '#fff'
    this.ctx.font = '40px sans-serif';
    this.ctx.fillText('Click an image to begin', 20, 250)

    this.base.appendChild(canvas);

    this.averager = new Averager();

    this.averager.addEventListener("message", ({data}) => {
      R.forEach(d => {
        this.ctx.fillStyle = `rgb(${d.avg[0]}, ${d.avg[1]}, ${d.avg[2]})`;
        this.ctx.fillRect(d.x, d.y, d.w, d.h);

        this.sorter.postMessage({
          q: d.avg,
          coords: { x: d.x, y: d.y, w: d.w, h: d.h },
        })
      }, data);
    });

    this.sorter = new Sorter();

    this.sorter.addEventListener("message", ({data: {thumb, coords}}) => {
      const img = new Image()
      img.src = thumb
      const args = R.prepend(img, R.props(["x", "y", "w", "h"], coords));
      img.onload = () => this.ctx.drawImage(...args)
    })

  }

  componentWillReceiveProps({images, current, open}) {

    this.sorter.postMessage({
      db: R.project(['thumb', 'avgColor'], images)
    })

    if (R.isNil(current) || current === this.current) return;

    fetch(current)
      .then(r => r.blob())
      .then(r => {
        const img = new Image();
        img.src = URL.createObjectURL(r);
        img.onload = () => {
          this.canvas.width = img.width;
          this.canvas.height = img.height;
          this.ctx.drawImage(img, 0, 0);
          const data = this.ctx.getImageData(0, 0, img.width, img.height);
          this.averager.postMessage({data}, [data.data.buffer])
          this.current = current;
          URL.revokeObjectURL(img.src);
        }
      })

  }

  render() {
    return div();
  }
}

