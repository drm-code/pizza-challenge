export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_DASHBOARD': {
      return {
        ...state,
        dashboard: {
          ...action.payload
        }
      }
    }
    case 'SET_ORDERS': {
      return {
        ...state,
        orders: {
          ...action.payload
        }
      }
    }
    case 'SET_PIZZAS': {
      return {
        ...state,
        pizzas: [
          ...action.payload
        ]
      }
    }
    default: {
      return state; 
    }
  }
}
