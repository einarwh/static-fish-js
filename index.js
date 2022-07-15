function createSvg() {
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svgElement.setAttribute("width", "600");
    svgElement.setAttribute("height", "600");
    
    let a = createVector(100, 100);
    let b = createVector(400, 0);
    let c = createVector(0, 400);
    let box = createBox(a, b, c);
    
    let hPict = createPicture(hLetter());
    let ePict = createPicture(eLetter());
    let nPict = createPicture(nLetter());
    let dPict = createPicture(dLetter());
    let rPict = createPicture(rLetter());
    let sPict = createPicture(sLetter());
    let oPict = createPicture(oLetter());
    let fishPict = createPicture(simpleFish());
    let fish3Pict = createPicture(fancyFish());
    let henderson = nonet(hPict, ePict, nPict, dPict, ePict, rPict, sPict, oPict, nPict);
    let georgePict = createPicture(george());
    //let rendering = column(row(hPict, ePict, nPict), row(dPict, ePict, rPict), row(sPict, oPict, nPict))(box);
    let hue = createHue("black");
    let lens = createLens(box, hue);
    let rendering = squareLimitColor(4, fish3Pict)(lens);
    //let rendering = henderson(lens);

    let mirrored = mirrorShapes(600, rendering);
    let childElements = mirrored.map(r => r.shape.toSvgElement(r.style));
    for (let child of childElements) {
        svgElement.appendChild(child);
    }

    return svgElement;
};
  
document.body.appendChild(createSvg());
