// I HATE DYNAMIC TYPING
// I HATE DYNAMIC TYPING
// I HATE DYNAMIC TYPING
// I HATE DYNAMIC TYPING
// I HATE DYNAMIC TYPING
// I HATE DYNAMIC TYPING

class NavPoint {
  constructor(point_data) {
    const attrs = point_data["$"];
    this.x = parseInt(attrs["cx"]);
    this.y = parseInt(attrs["cy"]);
    this.id = attrs["id"];
    this.poi_id = attrs["navpoint_poi_id"] ?? undefined;

    // Using an array here, since we don't have a lot of points so it's much faster, cause cpu caches
    this.neighboor_ids = new Set();
    for (const neighboor of point_data["nav:neighboor"]) {
      this.neighboor_ids.add(neighboor["$"]["neighboor_id"]);
    }
  }

  load_neighboors(nav) {
    this.neighboors = [];
    for (const id of this.neighboor_ids.keys()) {
      const neighboor = nav.nav_points.get(id);
      this.neighboors.push(neighboor);
      neighboor.ensure_neighboor(this);
    }
    this.sort_neighboors();
  }

  sort_neighboors() {
    this.neighboors.sort(
      (a, b) => this.distance_squared(a) < this.distance_squared(b)
    );
  }

  ensure_neighboor(neighboor) {
    if (this.neighboors == undefined) {
      this.neighboor_ids.add(neighboor.id);
    } else {
      if (!this.neighboors.some((n) => n.id == neighboor.id)) {
        this.neighboors.push(neighboor);
        this.sort_neighboors();
      }
    }
  }

  distance_squared(to) {
    return Math.pow(this.x - to.x, 2) + Math.pow(this.y - to.y);
  }
}

class Path {
  constructor() {
    this.points = [];
  }
  get_distance_squared() {
    let distance = 0;
    for (let i = 1; i < this.points.length; i++) {
      distance += this.points[i].distance_squared(this.points[i - 1]);
    }
    return distance;
  }
}

class Nav {
  constructor(nav_data) {
    this.nav_points = new Map();
    for (const point of nav_data) {
      const nav_point = new NavPoint(point);

      this.nav_points.set(nav_point.id, nav_point);
    }
    for (const nav_point of this.nav_points.values()) {
      nav_point.load_neighboors(this);
    }
  }

  shortest_path(from, to, searched = new Set()) {
    searched.add(from);
    const results = [];
    for (const neighboor of from.neighboors) {
      if (!searched.has(neighboor)) {
        if (neighboor == to) {
          let path = new Path();
          path.points.push(to, from);
          return path;
        }
        const res = this.shortest_path(neighboor, to, searched);
        if (res instanceof Path) {
          res.points.push(from);
          results.push(res);
        }
      }
    }
    if (results.length > 0) {
      return results.reduce((max, val) =>
        max.get_distance_squared() > val.get_distance_squared() ? max : val
      );
    }
  }
}

module.exports = { Nav, NavPoint };
