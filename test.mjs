import { createStore, combineReducers, applyMiddlewares } from './src';

// count reducer
const initialState = 0;
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment': {
      return state + action.count;
    }

    default: {
      return state;
    }
  }
};

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const incrementAction = (count) => ({ type: 'increment', count });

const thunkAction = () => (dispatch, getState) => {
  wait(1000).then(() => {
    dispatch(incrementAction(10));
  });
};

const thunkAction2 = () => (dispatch) => {
  dispatch(incrementAction(1));
  dispatch(incrementAction(2));
};

// middlewares
const logger = (store) => (next) => (action) => {
  console.log('will dispatch:', action);

  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);

  console.log('state after dispatch:', store.getState());

  // This will likely be the action itself, unless
  // a middleware further in chain changed it.
  return returnValue;
};

const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  return next(action);
};

const rootReducer = combineReducers({ counter: countReducer });
const store = createStore(rootReducer, {}, applyMiddlewares([thunk, logger]));

console.log('initial state: ', store.getState());

store.subscribe(() => console.log(`State changed!`, store.getState()));
store.dispatch(incrementAction(1));
store.dispatch(thunkAction2());
