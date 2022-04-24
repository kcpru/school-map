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

  clone() {
    const new_path = new Path();
    new_path.points = [...this.points];
    return new_path;
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

  // A very unoptimized search but good enough for our use case
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
}

module.exports = { Nav, NavPoint };
