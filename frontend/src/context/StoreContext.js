import { createContext, useReducer } from 'react';

export const StoreContext = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
        const newItem = action.payload;
        const existItem = state.cart.cartItems.find(
          (item) => item._id === newItem._id
        );
        const cartItems = existItem
          ? state.cart.cartItems.map((item) =>
              item._id === existItem._id ? newItem : item
            )
          : [...state.cart.cartItems, newItem];
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
        const itemToRemove = action.payload;
        const cartItems = state.cart.cartItems.filter(
            (item) => item._id !== itemToRemove._id
        );
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_CLEAR':
      localStorage.removeItem('cartItems');
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'USER_LOGIN': {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
        return { ...state, userInfo: action.payload };
    }
    case 'USER_LOGOUT': {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {}, // Ensure the shippingAddress property is preserved as an empty object
          paymentMethod: '',
        },
      };
    }
    case 'SAVE_PAYMENT_METHOD':
      localStorage.setItem('paymentMethod', action.payload);
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case 'SAVE_SHIPPING_ADDRESS': {
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}