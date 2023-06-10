import { getRandomInteger, getRandomElement } from '../utils/common.js';
import dayjs from 'dayjs';

const POINTS_COUNT = 8;

const MIN_DESCRIPTION_LENGTH = 2;
const MAX_DESCRIPTION_LENGTH = 5;

const MIN_PICTURE_ID = 1;
const MAX_PICTURE_ID = 100;

const MIN_PICTURES_PER_DESTINATION = 1;
const MAX_PICTURES_PER_DESTINATION = 10;

const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const DESTINATION_NAMES = [
  'Moscow',
  'Yekaterinburg',
  'Saint-Petersburg',
  'Saratov',
  'Kurgan',
  'Voronezh',
];

const DESCRIPTIONS = [
  'This place is surrounded by dense forests and mountain ranges.',
  'Here you will find numerous beautiful waterfalls and rivers.',
  'This place is famous for its unique flora and fauna.',
  'You can visit ancient ruins and museums here.',
  'This place is known for its traditional crafts and markets.',
  'You can enjoy breathtaking views from high mountain peaks here.',
  'This place is an ideal location for hiking and trekking.',
  'Here you will find numerous beautiful beaches and bays.',
  'This place is famous for its traditional culinary dishes and restaurants.',
  'You can try various extreme sports such as rock climbing and bungee jumping here.',
  'This place has a rich history and culture that can be explored in various museums and monuments.',
];

const getDescriptionLength = () => getRandomInteger(MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH);

const getPicuresAmount = () => {
  const hasPictures = Boolean(getRandomInteger());

  return hasPictures ? getRandomInteger(MIN_PICTURES_PER_DESTINATION, MAX_PICTURES_PER_DESTINATION) : 0;
};

const ElementsCount = {
  MIN: 2,
  MAX: 2
};

const getPrice = () => getRandomInteger(1, 15) * 50;

const getDescription = () => {
  let description = '';
  for (let i = 0; i < getDescriptionLength(); i++) {
    description += ` ${getRandomElement(DESCRIPTIONS)}`;
  }
  return description;
};

const generatePicture = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInteger(MIN_PICTURE_ID, MAX_PICTURE_ID)}`,
  description: getDescription(),
});

const generateDestination = (id) => ({
  id,
  description: getDescription(),
  name: DESTINATION_NAMES[id],
  pictures: Array.from({length: getPicuresAmount()}, generatePicture),
});

const getDestinations = () => Array.from({length: DESTINATION_NAMES.length}).map((value, index) => generateDestination(index));

const generateOffer = (id, pointType) => ({
  id,
  title: pointType,
  price: getPrice() / 5,
});

const generateOffersByType = (pointType) => ({
  type: pointType,
  offers: Array.from({length: getRandomInteger(ElementsCount.MIN, ElementsCount.MAX)}).map((value, index) => generateOffer(index + 1, pointType)),
});

const getOffersByType = () => Array.from({length: POINT_TYPES.length}).map((value, index) => generateOffersByType(POINT_TYPES[index]));

const offersByType = getOffersByType();
const destinations = getDestinations();

const generatePoint = (id) => {
  const offerType = getRandomElement(offersByType);
  const offerIDsByType = offerType.offers.map((offer) => offer.id);
  return {
    basePrice: getPrice(),
    dateFrom: dayjs().add(getRandomInteger(-7, 0), 'day').add(getRandomInteger(-23, 0), 'hour').add(getRandomInteger(-59, 0), 'minute'),
    dateTo: dayjs().add(getRandomInteger(0, 7), 'day').add(getRandomInteger(0, 23), 'hour').add(getRandomInteger(0, 59), 'minute'),
    destinationId: getRandomElement(destinations).id,
    id,
    isFavorite: Boolean(getRandomInteger()),
    offerIds: Array.from({length: getRandomInteger(0, offerIDsByType.length)}).map(() => offerIDsByType[getRandomInteger(0, offerIDsByType.length - 1)]),
    type: offerType.type,
  };
};

const getPoints = () => Array.from({length: POINTS_COUNT}).map((value, index) => generatePoint (index + 1));

export { getPoints, getDestinations, getOffersByType };
