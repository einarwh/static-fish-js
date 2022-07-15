let createHue = (color) => {
  return ({
    what: "hue",
    color: color,
    next: () => {
      switch (color) {
        case "black": return createHue("grey"); 
        case "grey": return createHue("white"); 
        case "white": return createHue("black");
        default: return createHue(color);
      }
    }
  });
};
