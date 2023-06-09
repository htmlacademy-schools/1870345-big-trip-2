import PointsView from '../view/trip-points.js';
import PreviewPointView from '../view/preview-point.js';
import EditingPointView from '../view/edit-form.js';
import SortingView from '../view/sort.js';
import NoPointView from '../view/no-points.js';
import { render } from '../render.js';

export default class TripEventsPresenter {
  #pointsList = null;
  #tripContainer = null;
  #pointsModel = null;
  #boardPoints = null;
  #destinations = null;
  #offers = null;

  constructor(tripContainer) {
    this.#pointsList = new PointsView();
    this.#tripContainer = tripContainer;
  }

  init(pointsModel) {
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    if (this.#boardPoints.length === 0) {
      render(new NoPointView(), this.#tripContainer);
    }
    else {
      render(new SortingView(), this.#tripContainer);
      render(this.#pointsList, this.#tripContainer);
      for (const point of this.#boardPoints){
        this.#renderPoint(point);
      }
    }
  }

  #renderPoint = (point) => {
    const pointComponent = new PreviewPointView(point, this.#destinations, this.#offers);
    const pointEditComponent = new EditingPointView(point, this.#destinations, this.#offers);

    const replacePointToEditForm = () => {
      this.#pointsList.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceEditFormToPoint = () => {
      this.#pointsList.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointsList.element);
  };
}