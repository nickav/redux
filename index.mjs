import Store from './store';
import applyMiddlewares from './applyMiddlewares';
import combineReducers from './combineReducers';

export const createStore = (reducer, preloadedState = {}, enhancer = null) => {
  const store = new Store(reducer, preloadedState);
  if (enhancer) {
    store.dispatch = enhancer(store)(store.dispatch.bind(store));
  }
  return store;
}

// test

// count reducer
const initialState = 0;
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case "increment": {
      return state + action.count;
    }
    
    default: {
      return state;
    }
  }
}

// middlewares
const logger = store => next => action => {
  console.log('will dispatch', action);

  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);

  console.log('state after dispatch', store.getState());

  // This will likely be the action itself, unless
  // a middleware further in chain changed it.
  return returnValue;
}

const rootReducer = combineReducers({ counter: countReducer });
const store = createStore(rootReducer, {}, applyMiddlewares([logger]));

store.subscribe(() => console.log(`State changed!`, store.getState()));
store.dispatch({ type: "increment", count: 1 });