const R = require("ramda");
import { fromJS, List } from "immutable";

const distance = R.curry((c1, c2) =>
  Math.abs(
    Math.pow((c2[0] - c1[0]) | 0, 2) +
    Math.pow((c2[1] - c1[1]) | 0, 2) +
    Math.pow((c2[2] - c1[2]) | 0, 2)
  ))

let odb;

onmessage = ({ data }) => {
  if (data.db) {
    odb = List(data.db);
  } else if (data.q) {
    const d = R.compose(distance(data.q), R.prop("avgColor"));
    const hasAvg = R.propSatisfies(R.compose(R.not, R.isNil), 'avgColor')
    const firstMatch = odb.filter(hasAvg).sortBy(d).first();

    if (firstMatch) {
      postMessage(R.assoc("coords", data.coords, firstMatch));
    }
  }
};
