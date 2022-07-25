let createLens = (box, hue) => {

  return ({
    what: "lens",
    box: box,
    hue: hue,
    turn: () => createLens(box.turn(), hue),
    flip: () => createLens(box.flip(), hue),
    toss: () => createLens(box.toss(), hue),
    moveVertically: (f) => createLens(box.moveVertically(f), hue),
    moveHorizontally: (f) => createLens(box.moveHorizontally(f), hue),
    scaleVertically: (f) => createLens(box.scaleVertically(f), hue),
    scaleHorizontally: (f) => createLens(box.scaleHorizontally(f), hue),
    splitVertically: (f) => {
      let boxes = box.splitVertically(f);
      return boxes.map(b => createLens(b, hue));
    },
    splitVerticallyMany: (fs) => {
      let boxes = box.splitVerticallyMany(fs);
      return boxes.map(b => createLens(b, hue));
    },
    splitHorizontally: (f) => {
      let boxes = box.splitHorizontally(f);
      return boxes.map(b => createLens(b, hue));
    },
    change: () => createLens(box, hue.next())
  });
};
