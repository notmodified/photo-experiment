import { avgSquares } from "./avgs.js";

onmessage = ({ data: { data } }) => {
  postMessage(avgSquares(data.width, data.height, data.data));
};
