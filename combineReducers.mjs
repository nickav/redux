const mapObject = (obj, fn) => Object.keys(obj).reduce((memo, key) => {
  memo[key] = fn(key, obj[key]);
  return memo;
}, {});

const combineReducers = (reducers) =>
  (state, action) =>
    mapObject(reducers, (key, reducer) => reducer(state[key], action));

export default combineReducers;