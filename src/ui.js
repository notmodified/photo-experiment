const R = require("ramda");
const h = require("hyperscript");
const { div, article, span, a, ul, li } = require("hyperscript-helpers")(h);

const desc = info => {
  const content = R.path(["description", "_content"], info);
  return R.isEmpty(R.trim(content)) ? "" : div(".photo__description", content);
};

const tagList = info => {
  const tags = R.pathOr([], ["tags", "tag"], info);
  return R.isEmpty(tags)
    ? ""
    : ul(".photo__tag-list", R.map(i => li("tag", i.raw), R.take(5, tags)));
};

const image = ({ thumb, title, info }) =>
  article(
    ".photo",
    div(".photo__wrapper", [
      div(".photo__top", [
        div({
          className: "photo__image",
          style: `background-image: url(${thumb})`
        }),
        div(".photo__headline", [
          span(".photo__title", a({ href: info.urls.url[0]._content }, title)),
          span(".photo__by", "by"),
          span(
            ".photo__user",
            a(
              { href: `http://www.flickr.com/photos/${info.owner.nsid}` },
              info.owner.username
            )
          )
        ]),
        desc(info)
      ]),
      tagList(info)
    ])
  );

export const app = images => div(".photo-list", R.map(image, images));
