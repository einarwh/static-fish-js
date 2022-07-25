let createBox = (a, b, c) => {
  return ({
    what: "box",
    a: () => a,
    b: () => b,
    c: () => c,
    turn: () => createBox(a.add(b), c, b.neg()),
    flip: () => createBox(a.add(b), b.neg(), c),
    toss: () => {
      let a1 = a.add(b.add(c).scale(0.5));
      let b1 = b.add(c).scale(0.5);
      let c1 = c.sub(b).scale(0.5);      
      return createBox(a1, b1, c1);
    },
    moveVertically: (f) => createBox(a.add(c.scale(f)), b, c),
    moveHorizontally: (f) => createBox(a.add(b.scale(f)), b, c),
    scaleVertically: (f) => createBox(a, b, c.scale(f)),
    scaleHorizontally: (f) => createBox(a, b.scale(f), c),
    splitVertically: (f) => {
      let g = 1.0 - f;
      let bot = createBox(a, b, c).scaleVertically(f);
      let top = createBox(a, b, c).moveVertically(f).scaleVertically(g);
      return [bot, top];
    },
    splitVerticallyMany: (fs) => {
      const array = [];
      let box = createBox(a, b, c);
      let moved = 0;
      for (let f of fs) {
        let current = box.moveVertically(moved).scaleVertically(f);
        moved = moved + f;
        array.push(current);
      }
      return array;
    },
    splitHorizontally: (f) => {
      let g = 1.0 - f;
      let left = createBox(a, b, c).scaleHorizontally(f);
      let right = createBox(a, b, c).moveHorizontally(f).scaleHorizontally(g);
      return [left, right];
    } 
  });
};
