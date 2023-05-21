import { RenderPosition, render } from '../render';
import NewCreateFormView from '../view/create-form';
import NewEditFormView from '../view/edit-form';
import NewFilterView from '../view/filters';
import NewSortView from '../view/sort';
import NewWayPointView from '../view/waypoint';

export default class TripPresenter {
  filtersView = new NewFilterView();
  sortView = new NewSortView();

  init(filtersContainer, tripContainer) {
    this.filtersContainer = filtersContainer;
    this.tripContainer = tripContainer;

    render(this.filtersView, this.filtersContainer);
    render(this.sortView, this.tripContainer, RenderPosition.AFTERBEGIN);

    render(new NewCreateFormView(), this.tripContainer);
    render(new NewEditFormView(), this.tripContainer);

    for (let i = 0; i < 3; i++) {
      render(new NewWayPointView(), this.tripContainer);
    }
  }
}
