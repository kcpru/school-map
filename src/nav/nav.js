// I HATE DYNAMIC TYPING
// I HATE DYNAMIC TYPING
// I HATE DYNAMIC TYPING
// I HATE DYNAMIC TYPING
// I HATE DYNAMIC TYPING
// I HATE DYNAMIC TYPING

class NavPoint {
  constructor(id, x, y, poi_id = undefined) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.poi_id = poi_id;
    this.neighboors = [];
  }

  // Add a neighboor ensuring there are no duplicates
  add_neighboor(neighboor) {
    if (!this.neighboors.some((n) => n.id == neighboor.id)) {
      this.neighboors.push(neighboor);
    }
  }

  distance_squared(to) {
    return Math.pow(this.x - to.x, 2) + Math.pow(this.y - to.y);
  }

  static fromSVGData(point) {
      const attrs = point["$"];
      const x = parseInt(attrs["cx"]);
      const y = parseInt(attrs["cy"]);
      const id = attrs["id"];
      const poi_id = attrs["navpoint_poi_id"] ?? undefined;

      return new NavPoint(id, x, y, poi_id);
  }
}

class Path {
  // You could lower memory consumption by using a reference to a previous point on the path instead of cloning the points
  // Again doesn't matter here
  constructor() {
    this.points = [];
  }

  clone() {
    const new_path = new Path();
    new_path.points = [...this.points];
    return new_path;
  }

  // Performance note: probably the easiest way to speed this up would be to cache the result of this function.
  // It's not neccesarry for this use case but if anyone needs to speed this up this is the place to do so
  get_distance_squared() {
    let distance = 0;
    for (let i = 1; i < this.points.length; i++) {
      distance += this.points[i].distance_squared(this.points[i - 1]);
    }
    return distance;
  }
}

class Nav {
  /**
 * @param {NavPoint[]} points 
 * @param {[string,string][]} vertecies - A collection of tuples of pairs of point ids
 */
  constructor(points, vertecies) {
    this.nav_points = new Map();
    this.poi_nav_point = new Map();

    for(const point of points) {
      this.nav_points.set(point.id, point);
      if(point.poi_id) {
        this.poi_nav_point.set(point.poi_id, point)
      }
    }
    for(const vertecie of vertecies) {
      let left = this.nav_points.get(vertecie[0]);      
      let right = this.nav_points.get(vertecie[1]);
      left.add_neighboor(right)
      right.add_neighboor(left)
    }
  }

  // A very unoptimized search but good enough for our use case Replace with dijkstra for speed
  shortest_path(from, to, searched = new Map()) {
    const paths = [];
    searched.set(from, null);
    for (const neighboor of from.neighboors) {
      if (neighboor == to) {
        const path = new Path();
        path.points.push(neighboor);
        path.points.push(from);
        searched.set(from, path);
        return path;
      }
      let path;
      if (!searched.has(neighboor)) {
        path = this.shortest_path(neighboor, to, searched);
      } else {
        path = searched.get(neighboor);
      }

      if (path != null) {
        path = path.clone();
        path.points.push(from);
        paths.push(path);
      }
    }
    if (paths.length > 0) {
      let sh_path = paths[0];
      for (const path of paths) {
        if (sh_path.get_distance_squared() > path.get_distance_squared()) {
          sh_path = path;
        }
      }
      searched.set(from, sh_path);
      return sh_path;
    }
  }
  static fromSVGData(nav_data) {
    const points = []
    const vertecies = []
    for (const point_data of nav_data) {
      let point = NavPoint.fromSVGData(point_data)
      points.push(point)
      for (const neighboor of point_data["nav:neighboor"]) {
        let right = neighboor["$"]["neighboor_id"];
        vertecies.push([point.id,right])
      }
    }
    return new Nav(points, vertecies)
  }
}

module.exports = { Nav, NavPoint };
