let createPoint = (x, y) => {
  return ({
    x: () => x,
    y: () => y,
    displace: (v) => createPoint(x + v.x(), y + v.y()),
    toString: () => `${x},${y}`
  });
};
