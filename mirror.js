let createMirrorMapper = (height) => {
  return (pt) => {
    return createPoint(pt.x(), height - pt.y());
  };
};

let mirrorShapes = (height, styledShapes) => {
  let mapper = createMirrorMapper(height);
  let mirroredShapes = styledShapes.map(s => { 
    return { style : s.style, shape: s.shape.transpose(mapper) }; 
  });
  return mirroredShapes;
};
