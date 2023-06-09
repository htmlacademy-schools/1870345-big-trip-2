export default class WayPointsModel {
  constructor() {
    this._waypoints = [];
  }

  init(waypoints, destinations, offers) {
    this._waypoints = waypoints;
    this._destinations = destinations;
    this._offers = offers;
  }

  get waypoints() {
    return this._waypoints;
  }

  get destinations() {
    return this._destinations;
  }

  get offers() {
    return this._offers;
  }
}
