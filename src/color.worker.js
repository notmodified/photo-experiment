import "babel-polyfill";
import { avgColor, avgSquares } from "./avgs.js";

onmessage = ({data}) => {
  postMessage({
    avgColor: avgColor(data.data.data),
    src: data.src
  });
};
