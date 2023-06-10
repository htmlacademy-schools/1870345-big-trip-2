import FiltersView from './view/filters.js';
import BoardPresenter from './presenter/board-presenter.js';
// import SiteMenuView from './view/site-menu.js';
import { render } from './framework/render.js';
import PointsModel from './model/points-model.js';
import { getPoints, getDestinations, getOffersByType } from './mock/point.js';
import { generateFilter } from './mock/filter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');

const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);

const boardPresenter = new BoardPresenter(siteMainElement.querySelector('.trip-events'), pointsModel);
boardPresenter.init();

const filters = generateFilter(pointsModel.points);

render(new FiltersView({filters}), siteHeaderElement.querySelector('.trip-controls__filters'));
