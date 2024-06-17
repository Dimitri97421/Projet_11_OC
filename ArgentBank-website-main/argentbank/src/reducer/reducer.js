const initialState = {
  token: null,
  user: '',
  username: '',
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'setToken':
      return { ...state, token: action.payload };
    case 'setUser':
      return { ...state, user: action.payload };
    case 'signOut':
      return { ...state, token: null, user: ''};
    case 'updateUsername':
      return { ...state, username: action.payload, user: { ...state.user, userName: action.payload } };
    default:
      return state;
  }
}


