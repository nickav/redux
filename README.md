# Redux

#### _Implement Redux from scratch for fun and for profit_

Redux is a global state management library! [Read more about redux here](https://redux.js.org/introduction/getting-started).

```bash
nick:~/dev/_learning/redux master > wc -l *.mjs src/*
      61 test.mjs
       9 src/applyMiddlewares.mjs
       9 src/combineReducers.mjs
      13 src/index.mjs
      36 src/store.mjs
       9 src/thunk.mjs
     137 total
```

## Redux Spec

At each step it's helpful to make a test file that runs your implementation!

Here's the order we reccomend implementing Redux in:

### 1. the Store class

Most of redux's functionality is baked into this class! Everything else is
a helper function built around this class.

```javascript
class Store
  constructor(rootReducer, initialState = {})
  getState(): state
  subscribe(listener): (unsubscribe: Function)
  replaceReducer(nextReducer): void
  dispatch(action): void
```

subscribe adds a callback function (and returns a function to unsubscribe that listener).

dispatch calls the rootReducer on the current state, updates the state to be the
result of that pure function and then calls all the listeners.

What's an action? Usually an object with the following type:

```javascript
{ type: string, data: object }
```

### 2. combineReducers

Each reducer only recieves a slice of the state (its name!)

```javascript
const combineReducers = (reducers) => (state, action) => nextState;
```

E.g.

```javascript
const countReducer = (state = 0, action) =>
  action.type === 'increment' ? state + 1 : state;

combineReducers({ counter: countReducer });
```

### 3. createStore

This method should be pretty trivial so far!

```javascript
const createStore = (reducer, preloadedState = {}, enhancer = null) => instanceof Store;
```

But wait... what's an enhancer?

### 4. applyMiddlewares

We need to extend createStore to allow the enhancer function. But what's an
enhancer? It's just a middleware!

OK, great, but like what's a middleware? It's a function that enhances dispatch (similar to how
combineReducers takes a bunch of reducers and makes them act as one).

A middleware has the following signature:

```javascript
const middleware = (store) => (next) => (action) => {};
```

When a middleware calls next, then the next middleware in the chain gets called.

This function has a weird signature!!!!!! Took us a while to finally get
this one right (without cheating!)

This is where 80% of our time was spent implmenenting redux!

```javascript
const applyMiddlewares = (middlewares) => (store) => (next) => (action) => {};
```

### 5. Bonus! redux-thunk

It turns out redux thunk is just a middleware!

Implement a middleware that would allow you to write actions that look like
this:

(keep in mind your store should still support plain object actions)

```javascript
const thunkAction = () => (dispatch, getState) => {
  dispatch({ type: 'increment' });
  dispatch({ type: 'increment' });
  // simulate an api call:
  setTimeout(() => dispatch({ type: 'increment' }), 400);
};
```
