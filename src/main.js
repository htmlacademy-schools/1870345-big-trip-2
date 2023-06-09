import TripPresenter from './presenter/waypoints-presenter.js';
import WayPointsModel from './model/waypoints-model.js';
import { getDestinations, getOffersByType, getWayPoints } from './fish/waypoint.js';


const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const wayPointsModel = new WayPointsModel();
const tripPresenter = new TripPresenter();

const waypoints = getWayPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

wayPointsModel.init(waypoints, destinations, offersByType);
tripPresenter.init(filterContainer, tripContainer, wayPointsModel);
