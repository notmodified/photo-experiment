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

import './index.scss';

import Canvas from "../canvas";

export default class Modal extends Component {

  constructor() {
    super();
    this.state = {
      open: false,
      hi: false
    }
  }

  componentWillReceiveProps({open}) {
    if (open) this.setState({open})
  }

  closeKey(event) {
    if (event.keyCode === 27) {
      this.setState({open: false})
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this.closeKey.bind(this))

    this.interval = setInterval(() => {
      if (this.state.open) return

      this.setState(Object.assign(this.state, {hi: !this.state.hi}))
      setTimeout(() => {
        this.setState(Object.assign(this.state, {hi: false}))
      }, 2000);
    }, 10000);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.closeKey.bind(this))

    clearInterval(this.interval);
  }

  render(props, {open, hi}) {
    return div('.modal' + (open ? '.modal--open' : ''), [
      div('.modal__pane', [
        div('.modal__image', [
          h(Canvas, props)
        ])
      ]),
      div({
        className: 'modal__close' + (hi ? ' modal__close--hi' : '') ,
        onClick: () => this.setState({open:!open})
      }, [
        h('svg', { width: '2rem', height: '2rem', viewBox: '0 0 20 20' }, [
          h('g', { fill: 'white' }, [
            h('rect', {x: 0, y: 0, width: 9, height: 9}),
            h('rect', {x: 11, y: 0, width: 9, height: 9}),
            h('rect', {x: 0, y: 11, width: 9, height: 9}),
            h('rect', {x: 11, y: 11, width: 9, height: 9}),
          ])
        ])
      ])
    ])
  }
}
