let createMoveToCommand = (point) => {
  return ({
    what: "moveTo",
    command: "moveTo",
    transpose: (mapper) => {
      return createMoveToCommand(mapper(point));
    },
    toString: () => {      
      return `M${point.x()} ${point.y()}`;
    }
  });
};

let createCurveToCommand = (cp1, cp2, ep) => {
  return ({
    what: "curveTo",
    command: "curveTo",
    transpose: (mapper) => {
      return createCurveToCommand(mapper(cp1), mapper(cp2), mapper(ep));
    },
    toString: () => {
      return `C ${cp1.x()} ${cp1.y()}, ${cp2.x()} ${cp2.y()}, ${ep.x()} ${ep.y()}`;
    }
  });
};

let createCloseCommand = () => {
  return ({
    what: "close",
    command: "close",
    transpose: (mapper) => {
      return createCloseCommand();
    },
    toString: () => {
      return `Z`;
    }
  });
};

let M = (x, y) => {
  return createMoveToCommand(createPoint(x, y));  
};

let C = (x1, y1, x2, y2, x3, y3) => {
  return createCurveToCommand(createPoint(x1, y1), createPoint(x2, y2), createPoint(x3, y3));
};

let Z = () => {
  return createCloseCommand();  
};

let createPath = (...commands) => {
  return ({
    what: "path",
    shape: "path",
    commands: () => commands,
    transpose: (mapper) => {
      let transposed = commands.map(c => c.transpose(mapper));
      return createPath.apply(null, transposed);
    },
    toSvgElement: (style) => {
      const el = createSvgElement("path");
      let strs = commands.map(cmd => cmd.toString());
      let d = strs.reduce((prev, curr) => prev + " " + curr, "");
      el.setAttribute("d", d);
      for (const prop in style) {
        el.setAttribute(prop, style[prop]);
      }
      return el;
    }
  });
};
