import ApiService from '../framework/api-service.js';
import { ApiServiceResponseMethod } from '../const.js';

export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this
      ._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  updateDestinations = async (destination) => {
    const response = await this._load({
      url: `destinations/${destination.id}`,
      method: ApiServiceResponseMethod.PUT,
      body: JSON.stringify(destination),
      headers: new Headers({'Content-type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };
}
