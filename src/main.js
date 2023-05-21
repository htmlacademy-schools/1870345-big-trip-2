import TripPresenter from './presenter/presenter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter();

tripPresenter.init(filterContainer, tripContainer);
