export default function userCoordinates(userCoordinatesState = {
  longitude: 0,
  latitude: 0,
}, action) {
  switch (action.type) {
    case 'USER_COORDINATES':
      return Object.assign({}, userCoordinatesState, action.userCoordinates);

    default:
      return userCoordinatesState;
  }
}
