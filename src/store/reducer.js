export default function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_DASHBOARD': {
      return {
        ...state,
        dashboard: action.payload
      }
    }
    case 'LOAD_ORDERS': {
      return {
        ...state,
        orders: action.payload
      }
    }
    default: {
      return state;
    }
  }
}
