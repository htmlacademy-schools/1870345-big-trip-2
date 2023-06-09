import FiltersView from './view/filters.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
// import SiteMenuView from './view/site-menu.js';
import { render } from './render.js';
import PointsModel from './model/points-model.js';
import { getPoints, getDestinations, getOffersByType } from './mock/point.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripPresenter = new TripEventsPresenter(siteMainElement.querySelector('.trip-events'));

const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();

render(new FiltersView(), siteHeaderElement.querySelector('.trip-controls__filters'));

pointsModel.init(points, destinations, offersByType);
tripPresenter.init(pointsModel);
