let getStrokeWidth = (box) => {
  let s = Math.max(box.b().len(), box.c().len());
  return s / 80.0;
};

let getInnerEyeStyle = (lens) => {
  let color = lens.hue.color;
  let fillColor = color == "white" ? "black" : color;
  return {
    'fill': fillColor
  };
};

let getOuterEyeStyle = (lens) => {
  return {
    'stroke-width': getStrokeWidth(lens.box),
    'stroke': getHighlightColor(lens.hue),
    'stroke-linecap': "butt",
    'fill': "white"
  };
};

let getHighlightColor = (hue) => {
  return hue.color == "white" ? "black" : "white";
}

let getHighlightStyle = (lens) => {
  return {
    'stroke-width': getStrokeWidth(lens.box),
    'stroke': getHighlightColor(lens.hue),
    'stroke-linecap': "butt",
    'fill': "none"
  };
};

let getStyle = (lens) => {
  const allowOutline = true;
  let box = lens.box;
  let color = lens.hue.color;
  let s = Math.max(box.b().len(), box.c().len());
  if (allowOutline && s >= 100) { 
    let sw = s / 160.0;
    let sc = color == 'white' ? 'grey' : color;
    return {
      'stroke': sc,
      'stroke-width': sw,
      'fill': color
    };
  }
  else {
    return {
      'fill': color
    };
  } 
};

let fancyFish = () => {

  let bodyPath = 
    createPath(
      M(0.000, 0.000),
      C(0.110, 0.110, 0.175, 0.175, 0.250, 0.250),
      C(0.372, 0.194, 0.452, 0.132, 0.564, 0.032),
      C(0.730, 0.056, 0.834, 0.042, 1.000, 0.000),
      C(0.896, 0.062, 0.837, 0.107, 0.766, 0.202),
      C(0.660, 0.208, 0.589, 0.217, 0.500, 0.250),
      C(0.500, 0.410, 0.500, 0.460, 0.500, 0.500),
      C(0.500, 0.575, 0.500, 0.625, 0.500, 0.750),
      C(0.411, 0.783, 0.340, 0.792, 0.234, 0.798),
      C(0.163, 0.893, 0.104, 0.938, 0.000, 1.000),
      C(-0.042, 0.834, -0.056, 0.730, -0.032, 0.564),
      C(-0.132, 0.452, -0.194, 0.372, -0.250, 0.250),
      C(-0.150, 0.150, -0.050, 0.050, 0.000, 0.000),
      Z());

  let leftOuterEyePath = 
    createPath(
      M(0.004, 0.800),
      C(0.040, 0.772, 0.068, 0.696, 0.074, 0.685),
      C(0.045, 0.660, 0.010, 0.617,-0.008, 0.592),
      C(-0.017, 0.685, -0.012, 0.770, 0.004, 0.800),
      Z());

  let leftInnerEyePath = 
    createPath(
      M(0.018, 0.720),
      C(0.038, 0.708, 0.053, 0.684, 0.057, 0.674),
      C(0.035, 0.652, 0.010, 0.622, 0.008, 0.618),
      C(0.005, 0.685, 0.010, 0.700, 0.018, 0.720),
      Z());

  let rightOuterEyePath = 
    createPath(
      M(0.095, 0.870),
      C(0.160, 0.840, 0.200, 0.790, 0.205, 0.782),
      C(0.165, 0.760, 0.140, 0.740, 0.115, 0.715),
      C(0.095, 0.775, 0.090, 0.830, 0.095, 0.870),
      Z());

  let rightInnerEyePath = 
    createPath(
      M(0.128, 0.810),
      C(0.150, 0.805, 0.174, 0.783, 0.185, 0.774),
      C(0.154, 0.756, 0.139, 0.740, 0.132, 0.736),
      C(0.126, 0.760, 0.122, 0.795, 0.128, 0.810),
      Z());

  let mainSpinePath = 
    createPath(
      M(0.840, 0.070),
      C(0.350, 0.120, 0.140, 0.500, 0.025, 0.900));

  let leftFinStemPath = 
    createPath(
      M(-0.015, 0.520),
      C(0.040, 0.400, 0.120, 0.300, 0.210, 0.260));

  let rightFinStemPath = 
    createPath(
      M(0.475, 0.270),
      C(0.320, 0.350, 0.340, 0.600, 0.240, 0.770));  

  let rightFinBottomDelimiterPath = 
    createPath(
      M(0.377, 0.377),
      C(0.410, 0.410, 0.460, 0.460, 0.495, 0.495));

  let tailFinStemPath = 
    createPath(
      M(0.430, 0.165),
      C(0.480, 0.175, 0.490, 0.220, 0.490, 0.230));

  let tailFinBottomLinePath = 
    createPath(
      M(0.452, 0.178),
      C(0.510, 0.130, 0.540, 0.110, 0.600, 0.080));

  let tailFinTopLinePath = 
    createPath(
      M(0.482, 0.215),
      C(0.520, 0.200, 0.600, 0.160, 0.740, 0.150));

  let leftFinTopLinePath = 
    createPath(
      M(-0.170, 0.237),
      C(-0.125, 0.355, -0.065, 0.405, 0.010, 0.480));

  let leftFinMiddleLinePath = 
    createPath(
      M(-0.110, 0.175),
      C(-0.060, 0.250, -0.030, 0.300, 0.080, 0.365));

  let leftFinBottomLinePath = 
    createPath(
      M(-0.045, 0.115),
      C(0.010, 0.180, 0.060, 0.230, 0.170, 0.280));

  let rightFinTopLinePath = 
    createPath(
      M(0.270, 0.700),
      C(0.340, 0.720, 0.426, 0.710, 0.474, 0.692));

  let rightFinMiddleLinePath = 
    createPath(
      M(0.310, 0.570),
      C(0.400, 0.622, 0.435, 0.618, 0.474, 0.615));

  let rightFinBottomLinePath = 
    createPath(
      M(0.350, 0.435),
      C(0.400, 0.505, 0.422, 0.520, 0.474, 0.538));

  let shapes = 
    [ { styleFn: getStyle, shape: bodyPath } 
    , { styleFn: getOuterEyeStyle, shape: leftOuterEyePath }
    , { styleFn: getInnerEyeStyle, shape: leftInnerEyePath } 
    , { styleFn: getOuterEyeStyle, shape: rightOuterEyePath }
    , { styleFn: getInnerEyeStyle, shape: rightInnerEyePath } 
    , { styleFn: getHighlightStyle, shape: mainSpinePath } 
    , { styleFn: getHighlightStyle, shape: leftFinStemPath } 
    , { styleFn: getHighlightStyle, shape: rightFinStemPath } 
    , { styleFn: getHighlightStyle, shape: rightFinBottomDelimiterPath } 
    , { styleFn: getHighlightStyle, shape: tailFinStemPath } 
    , { styleFn: getHighlightStyle, shape: tailFinBottomLinePath } 
    , { styleFn: getHighlightStyle, shape: tailFinTopLinePath } 
    , { styleFn: getHighlightStyle, shape: leftFinTopLinePath } 
    , { styleFn: getHighlightStyle, shape: leftFinMiddleLinePath } 
    , { styleFn: getHighlightStyle, shape: leftFinBottomLinePath } 
    , { styleFn: getHighlightStyle, shape: rightFinTopLinePath } 
    , { styleFn: getHighlightStyle, shape: rightFinMiddleLinePath } 
    , { styleFn: getHighlightStyle, shape: rightFinBottomLinePath } 
    ];
    
  return shapes;
};
