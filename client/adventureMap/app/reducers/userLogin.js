export default function userLogin(userLoginState = {
  userInfo: {},
  login: false,
}, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return Object.assign({}, userLoginState, action.userLogin);

    default:
      return userLoginState;
  }
}
