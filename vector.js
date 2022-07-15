let createVector = (x, y) => {
  return ({
    what: "vector",
    x: () => x,
    y: () => y,
    add: (v) => createVector(x + v.x(), y + v.y()),
    sub: (v) => createVector(x - v.x(), y - v.y()),
    neg: () => createVector(-x, -y),
    scale: (f) => createVector(f * x, f * y),
    len: () => Math.sqrt(x * x + y * y),
    equals: (v) => v.x() === x && v.y() === y,
    values: () => [x, y]
  });
};
