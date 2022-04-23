const data = require("../assets/maps/pietro1.json");
const nav = require("./nav");

let nav_obj = new nav.Nav(data["svg"]["circle"]);
let from = nav_obj.nav_points.get("navpoint_27");
let to = nav_obj.nav_points.get("navpoint_K");
console.log(from.id, to.id);
console.log(nav_obj.shortest_path(from, to));
