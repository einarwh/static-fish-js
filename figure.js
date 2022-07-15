let createStyledPolylineForGeorge = (pts) => {
  let getStrokeWidth = (box) => {
    let s = Math.max(box.b().len(), box.c().len());
    return s / 80.0;
  };  
  let getStyle = (lens) => {
    return {
      'stroke-width': getStrokeWidth(lens.box),
      'stroke': "purple",
      'fill': "none"
    };
  };  
  return {
    styleFn: getStyle,
    shape: createPolyline(pts)
  };
};

let george = () => {

  let pts1 = 
    [ createPoint(0.00, 0.55)
    , createPoint(0.15, 0.45)
    , createPoint(0.30, 0.55)
    , createPoint(0.40, 0.50)
    , createPoint(0.20, 0.00) ];

  let pts2 = 
    [ createPoint(0.00, 0.80)
    , createPoint(0.15, 0.60)
    , createPoint(0.30, 0.65)
    , createPoint(0.40, 0.65)
    , createPoint(0.35, 0.80)
    , createPoint(0.40, 1.00) ];

  let pts3 = 
    [ createPoint(0.60, 1.00)
    , createPoint(0.65, 0.80)
    , createPoint(0.60, 0.65)
    , createPoint(0.80, 0.65)
    , createPoint(1.00, 0.45) ];
    
  let pts4 = 
    [ createPoint(1.00, 0.20)
    , createPoint(0.60, 0.50)
    , createPoint(0.80, 0.00) ];
  
  let pts5 = 
    [ createPoint(0.40, 0.00)
    , createPoint(0.50, 0.30)
    , createPoint(0.60, 0.00)] ;
  
  let all = [ pts1, pts2, pts3, pts4, pts5 ];

  return all.map(createStyledPolylineForGeorge);
};
