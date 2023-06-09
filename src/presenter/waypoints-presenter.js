import { RenderPosition, render } from '../render';
// import NewCreateFormView from '../view/create-form';
import NewEditFormView from '../view/edit-form';
import NewFilterView from '../view/filters';
import NewSortView from '../view/sort';
import NewWayPointView from '../view/waypoint';

export default class TripPresenter {
  filtersView = new NewFilterView();
  sortView = new NewSortView();

  init(filtersContainer, tripContainer, wayPointsModel) {
    this.filtersContainer = filtersContainer;
    this.tripContainer = tripContainer;
    this.wayPointsModel = wayPointsModel;
    this.wayPoints = [...wayPointsModel.waypoints];
    this.destinations = [...wayPointsModel.destinations];
    this.offers = [...wayPointsModel.offers];

    render(this.filtersView, this.filtersContainer);
    render(this.sortView, this.tripContainer, RenderPosition.AFTERBEGIN);

    // render(new NewCreateFormView(), this.tripContainer);
    render(new NewEditFormView(this.wayPoints[0], this.destinations, this.offers), this.tripContainer);

    for (let i = 0; i < this.wayPoints.length; i++) {
      render(new NewWayPointView(this.wayPoints[i], this.destinations, this.offers), this.tripContainer);
    }
  }
}
