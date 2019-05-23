import Store from './store';

export { default as applyMiddlewares } from './applyMiddlewares';
export { default as combineReducers } from './combineReducers';
export { default as thunk } from './thunk';

export const createStore = (reducer, preloadedState = {}, enhancer = null) => {
  const store = new Store(reducer, preloadedState);
  if (enhancer) {
    store.dispatch = enhancer(store)(store.dispatch.bind(store));
  }
  return store;
};
