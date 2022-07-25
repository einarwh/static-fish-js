let blank = (_) => { return []; }

let turn = (picture) => {
  return (lens) => {
    return picture(lens.turn());
  };
};

let flip = (picture) => {
  return (lens) => {
    return picture(lens.flip());
  };
};

let toss = (picture) => {
  return (lens) => {
    return picture(lens.toss());
  };
};

let belowRatio = (m, n, p1, p2) => {
  return (lens) => {
    let f = m / (m + n);
    let [bot, top] = lens.splitVertically(f);
    return p1(bot).concat(p2(top));
  };
};

let below = (p1, p2) => {
  return belowRatio(1, 1, p1, p2);
};

let aboveRatio = (m, n, p1, p2) => {
  return (lens) => {
    let f = n / (m + n);
    let [bot, top] = lens.splitVertically(f);
    return p1(top).concat(p2(bot));
  };
};

let above = (p1, p2) => {
  return aboveRatio(1, 1, p1, p2);
};

let besideRatio = (m, n, p1, p2) => {
  return (lens) => {
    let f = m / (m + n);
    let [left, right] = lens.splitHorizontally(f);
    return p1(left).concat(p2(right));
  };
};

let beside = (p1, p2) => {
  return besideRatio(1, 1, p1, p2);
};

let quartet = (nw, ne, sw, se) => {
  return above(beside(nw, ne || nw), beside(sw || nw, se || nw));
};

let row = (...ps) => {
  let [h, ...t] = ps;
  if (t.length == 0) {
    return h;
  }
  else {
    return besideRatio(1, t.length, h, row.apply(this, t));
  }
}

let column = (...ps) => {
    let [h, ...t] = ps;
    if (t.length == 0) {
        return h;
    }
    else {
        return aboveRatio(1, t.length, h, column.apply(this, t));
    }
}

let nonet = (nw, nm, ne, mw, mm, me, sw, sm, se) => {
    return column(
        row(nw, nm, ne),
        row(mw, mm, me),
        row(sw, sm, se));
}

let over = (p1, p2) => {
    return (lens) => {
        return p1(lens).concat(p2(lens));
    };
};

let rehue = (p) => {
    return (lens) => {
        return p(lens.change());
    };
}

let ttile = (p) => {
    let pn = flip(toss(p));
    let pe = turn(turn(turn(pn)));
    return over(pe, over(pn, p));
};

let ttileColor = (p, rehueN, rehueE) => {
    let pn = flip(toss(p));
    let pe = turn(turn(turn(pn)));
    return over(rehueE(pe), over(rehueN(pn), p));
};

let ttileColor1 = (p) => {
    let rehueN = (p) => rehue(p);
    let rehueE = (p) => rehue(rehue(p));
    return ttileColor(p, rehueN, rehueE);
};

let ttileColor2 = (p) => {
    let rehueN = (p) => rehue(rehue(p));
    let rehueE = (p) => rehue(p);
    return ttileColor(p, rehueN, rehueE);
};

let utile = (p) => {
    let pn = flip(toss(p));
    let pw = turn(pn);
    let ps = turn(pw);
    let pe = turn(ps);
    return over(pe, over(ps, over(pw, pn)));
};

let utileColor = (p, rehueN, rehueW, rehueS, rehueE) => {
    let pn = flip(toss(p));
    let pw = turn(pn);
    let ps = turn(pw);
    let pe = turn(ps);
    return over(rehueE(pe), over(rehueS(ps), over(rehueW(pw), rehueN(pn))));
};

let utileColor1 = (p) => {
    let rehueNS = (p) => rehue(rehue(p));
    let rehueWE = (p) => p;
    return utileColor(p, rehueNS, rehueWE, rehueNS, rehueWE);
};

let utileColor2 = (p) => {
    let rehueN = (p) => p;
    let rehueW = (p) => rehue(rehue(p));
    let rehueS = rehue;
    let rehueE = rehueW;
    return utileColor(p, rehueN, rehueW, rehueS, rehueE);
};

let utileColor3 = (p) => {
    let rehueN = (p) => rehue(rehue(p));
    let rehueW = (p) => p;
    let rehueS = rehue;
    let rehueE = rehueW;
    return utileColor(p, rehueN, rehueW, rehueS, rehueE);
};

let side = (n, p) => {
    if (n == 0) {
        return blank;
      } else {
        let s = side(n - 1, p);
        let t = ttile(p);
        return quartet(s, s, turn(t), t);
      };
};

let sideColor = (tt, rehueSW, rehueSE, n, p) => {
    let aux = (n, p) => {
        let t = tt(p);
        let r = n == 1 ? blank : aux (n - 1, p);
        return quartet(r, r, rehueSW(turn(t)), rehueSE(t));
    } 
    return aux(n, p);
}; 

let sideColorNS = (n, p) => {
    let rehueSW = (p) => p;
    let rehueSE = rehue; 
    return sideColor(ttileColor1, rehueSW, rehueSE, n, p);
};

let sideColorWE = (n, p) => {
    let rehueSW = (p) => rehue(rehue(p));
    let rehueSE = rehue; 
    return sideColor(ttileColor2, rehueSW, rehueSE, n, p);
};

let corner = (n, p) => {
    if (n == 0) {
        return blank;
      } else {
        let c = corner(n - 1, p);
        let s = side(n - 1, p);
        return quartet(c, s, turn(s), utile(p));
      };  
};

let cornerColor = (ut, side1, side2, n, p) => {
    let u = ut(p);
    let fn = (x) => {
        let [c, ne, sw] = x == 1 
            ? [ blank, blank, blank ] 
            : [ fn(x - 1), side1(x - 1, p), side2(x - 1, p)];
        return quartet(c, ne, turn(sw), u);
    };
    return fn(n);
};

let cornerColorNWSE = (n, p) => {
    return cornerColor(utileColor3, sideColorNS, sideColorWE, n, p);
};

let cornerColorNESW = (n, p) => {
    return cornerColor(utileColor2, sideColorWE, sideColorNS, n, p);
};

let squareLimit = (n, p) => {
    let nw = corner(n, p);
    let sw = turn(nw);
    let se = turn(sw);
    let ne = turn(se);
    let nm = side(n, p);
    let mw = turn(nm);
    let sm = turn(mw);
    let me = turn(sm);
    let mm = utile(p);
    return nonet(nw, nm, ne, mw, mm, me, sw, sm, se);
};

let squareLimitColor = (n, p) => {    
    let nw = cornerColorNWSE(n, p);
    let sw = turn(cornerColorNESW(n, p));
    let se = turn(turn(nw));
    let ne = turn(turn(sw));
    let nm = sideColorNS(n, p);
    let mw = turn(sideColorWE(n, p));
    let sm = turn(turn(nm));
    let me = turn(turn(mw));
    let mm = utileColor1(p);
    return nonet(nw, nm, ne, mw, mm, me, sw, sm, se);
};

let range = (start, end) => {
  return new Array(end - start).fill().map((_, i) => i + start);
};

let crowd = (count, depth, p) => {
  let numbers = range(count, count + depth);
  let proportions = numbers.map(n => 1/n);
  return (lens) => {
    console.log("here");
    let lenses = lens.splitVerticallyMany(proportions);
    let shapes = [];
    for (let i = 0; i < numbers.length; i++) {
      let n = numbers[i];
      let r = row.apply(null, Array(n).fill(p));
      shapes = shapes.concat(r(lenses[i]));
    }
    return shapes;
  };
}