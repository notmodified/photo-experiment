# A very simple photo stream experiment

[tldr; running here](https://notmodified.github.io/photo-experiment/)

Uses some simple tools to pull a photo feed into the browser and display it, with a twist.


After a `yarn` to fetch dependencies:

## For local dev :
`yarn start` (npm probably works too) this should leave something running at http://localhost:8080/webpack-dev-server/index.html

## For 'production' build :
`yarn build` will leave everything in /dist

## What does it do?
* Pulls photos from the flickr api stream and decorates them with a bit of meta data.
* Once an image is selected it attempts to build a photo mosaic based on all loaded images. Note the attempts caveat, it is an experiment after all.

## What doesn't it do?
* Browser millage may vary. The basic image display should be ok, but the rest gets a bit fancy for older setups.
* Arrange code very well. I'm still wrapping my head around how these things fit together and where state and behaviour belong. I also decided to go sassless on this one and try out just postcssing everything. I need to find a way to deal with vars. I think next time I'd like to try the css in js approach.
* Test anything. This is just a throw away fiddle and learning experience, not a project.

## How does it do it

### The listing bit
The grabbing of images and metadata uses a pretty standard fetch api based approach to build up a datastructure that looks something like this :
```json
[
  {
    'thumb': '<some thumbnail url>',
    'info': <metadata from flickr>,
  }
]
```

That structure is then rendered using a preact component tree.


### The mosaic bit
Whilst everything else is getting rendered we fire up three web workers.
* Colorer - receives each image in turn and averages its colours
* Averager - takes an image, splits it into a grid and averages the squares
* Sorter - given a list of images and a colour find the closest match

The colorer starts getting fed images to average as soon as they are available. The calculated values are added to the active image list as they return.

An image click kicks off a fetch for a larger version of the image in question. Once retrieved this larger versions data is sent along to the Averager. Once averaged the results are sent to the Sorter. The closest matching image thumb is then painted in position.

