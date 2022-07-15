let createPolyline = (points) => {
  return ({
    what: "polyline",
    shape: "polyline",
    points: () => points,
    transpose: (mapper) => {
      let transposed = points.map(mapper);
      return createPolyline(transposed);
    },
    toSvgElement: (style) => {
      const el = createSvgElement("polyline");
      let strPoints = points.map(p => p.toString());
      let pointsStr = strPoints.reduce((prev, curr) => prev + " " + curr, "");
      el.setAttribute("points", pointsStr);
      for (const prop in style) {
        el.setAttribute(prop, style[prop]);
      }
      return el;
    }
  });
};
