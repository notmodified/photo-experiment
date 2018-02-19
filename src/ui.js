
import mi from "mithril"
const R = require("ramda")

const image = ({ thumb, title, info }) =>
  mi(
    "article",
    { class: "photo" },
    mi("div", { class: "photo__wrapper" }, [
      mi("div", { class: "photo__top" }, [
        mi("div", {
          class: "photo__image",
          style: `background-image: url(${thumb})`
        }),
        mi("div", { class: "photo__headline" }, [
          mi(
            "span",
            { class: "photo__title" },
            mi("a", { href: info.urls.url[0]._content }, title)
          ),
          mi("span", { class: "photo__by" }, "by"),
          mi(
            "span",
            { class: "photo__user" },
            mi(
              "a",
              { href: `http://www.flickr.com/photos/${info.owner.nsid}` },
              info.owner.username
            )
          )
        ]),
        mi("div", { class: "photo__description" }, info.description._content)
      ]),
      mi(
        "ul",
        { class: "photo__tag-list" },
        R.map(i => mi("li", { class: "tag" }, i.raw), R.take(5, info.tags.tag))
      )
    ])
  )

export const app = {
  view({ attrs: { images } }) {
    return mi("div", { class: "photo-list" }, R.map(image, images))
  }
};

