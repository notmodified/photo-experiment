const R = require("ramda");
const striptags = require("striptags");

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

import './index.scss'

const desc = info => {
  const content = striptags(R.path(["description", "_content"], info));
  return R.isEmpty(R.trim(content)) ? "" : div(".photo__description", content);
};

const tagList = info => {
  const tags = R.pathOr([], ["tags", "tag"], info);
  return R.isEmpty(tags)
    ? ""
    : ul(".photo__tag-list", R.map(i => li(".tag", i.raw), R.take(5, tags)));
};

export const photo = (click, { thumb, title, info }) =>
  article(".photo", [
    div({
      className: "photo__wrapper",
      onClick: () => click(info)
    }, [
      div(".photo__top", [
        div({
          className: "photo__image",
          style: `background-image: url(${thumb})`,
        }),
        div(".photo__headline", [
          span(".photo__title", [
            a({ target: '_blank', href: info.urls.url[0]._content }, title)
          ]),
          span(".photo__by", "by"),
          span(".photo__user", [
            a(
              { target: '_blank', href: `http://www.flickr.com/photos/${info.owner.nsid}` },
              info.owner.username
            )
          ])
        ]),
        desc(info)
      ]),
      tagList(info)
    ])
  ]);

