let createStyledPolylineForStickman = (pts) => {
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

let createStyledPolygonForStickman = (pts) => {
  let getStrokeWidth = (box) => {
    let s = Math.max(box.b().len(), box.c().len());
    return s / 40.0;
  };  
  let getStyle = (lens) => {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    return {
      'stroke-width': getStrokeWidth(lens.box),
      'stroke': 'none',
      'fill': "#" + randomColor
    };
  };
  return {
    styleFn: getStyle,
    shape: createPolygon(pts)
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

  return all.map(createStyledPolylineForStickman);
};

let gridPoint = (x, y) => {
  return createPoint(x/14, y/20);
};

let man = () => {

  let pts = 
    [ gridPoint(4, 0)
    , gridPoint(6, 0)
    , gridPoint(7, 3)
    , gridPoint(8, 0)
    , gridPoint(10, 0)
    , gridPoint(8, 8)
    , gridPoint(8, 10)
    , gridPoint(12, 10)
    , gridPoint(12, 14)
    , gridPoint(10, 14)
    , gridPoint(10, 12)
    , gridPoint(8, 12)
    , gridPoint(8, 14)
    , gridPoint(10, 16)
    , gridPoint(10, 18)
    , gridPoint(8, 20)
    , gridPoint(6, 20)
    , gridPoint(4, 18)
    , gridPoint(4, 16)
    , gridPoint(6, 14)
    , gridPoint(6, 12)
    , gridPoint(0, 12)
    , gridPoint(0, 10)
    , gridPoint(6, 10)
    , gridPoint(6, 8)
    , gridPoint(4, 0)
   ];

  let all = [ pts ];

  return all.map(createStyledPolygonForStickman);
};

