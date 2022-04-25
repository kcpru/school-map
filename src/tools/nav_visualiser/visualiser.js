// All bad
// Horrible code
// bad
import {Nav} from "./nav.js";
const svgNS = "http://www.w3.org/2000/svg";

const update_visualization = () => {
  const svg = document.querySelector("svg")
  svg.addEventListener("click", (e) => {
    console.log(e.offsetX, e.offsetY)
    navigator.clipboard.writeText(`\tcx="${e.offsetX}"\n\tcy="${e.offsetY}"`)
  })

  const drawLine = (x1,y1,x2,y2) => {
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('x1',x1);
    newLine.setAttribute('y1',y1);
    newLine.setAttribute('x2',x2);
    newLine.setAttribute('y2', y2);
    newLine.setAttribute("stroke", "black")
    svg.appendChild(newLine);
  }
  const drawText = (x,y,text) => {

    const textnode = document.createElementNS(svgNS,"text");
    textnode.setAttributeNS(null,"font-size","20");
    textnode.setAttributeNS(null,"x",x);     
    textnode.setAttributeNS(null,"y",y); 

    textnode.appendChild(document.createTextNode(text))
    svg.appendChild(textnode)
  }
  let nav = Nav.fromSVGData(svg)
  for(const point of nav.nav_points.values()) {
    drawText(point.x+10,point.y, point.id)
    for(const neighbor of point.neighboors) {
      drawLine(point.x, point.y, neighbor.x, neighbor.y)

    }
  }

}

let old_data =""
const update_loop = async () => {
  let data = await fetch("/map.svg").then(r => r.text())
  if(old_data !== data) {
    document.querySelector("#display").innerHTML = data;
    update_visualization()
  }
  old_data = data
  setTimeout(update_loop, 50)
};
update_loop()
