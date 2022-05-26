import { createContext, useReducer, useContext } from 'react';
import faker from 'faker';
// const faker = require('faker');
import { cartReducer, filterReducer } from './Reducers';

const CartContext = createContext();
const FilterContext = createContext();

faker.seed(99);
// for getting consistent results

function Context({ children }) {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));
  // console.log(Array(20));
  // create an array of 20 undefined/empty

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: '',
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      <FilterContext.Provider value={{ filterState, filterDispatch }}>
        {children}
      </FilterContext.Provider>
    </CartContext.Provider>
  );
}

export default Context;

export const CartState = () => useContext(CartContext);
// now CartState can use value inside CartContext.Provider, ie state & dispatch, since useContext returns the current context value

export const FilterState = () => useContext(FilterContext);

// NOTE: either use 2 contexts or change the name of the state CartState to States, CartContext to context & pass all states & dispatches to that context
// making new context creates new nodes..

// Note: HooksRule; Hooks can only be called inside of the body of a function component. Even if called inside a variable, the variable should be inside a function. No direct assigning to variable

// useContext() is used instead of drilling down data
// Context.Provider is used on Parent & useContext is used on Child/required component
// useReducer() is used for complex state management
// state & dispatch passed to Context.Provider for manipulating it from child component easily(instead of different functions on different components)
// dispatch is called with different actions from required components
// reducer function is imported from reducers, all other logic is included in context section itself
