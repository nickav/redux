# Redux

#### _Implement Redux from scratch for fun and for profit_

## Redux Spec

At each step of the way it's helpful to make a test file that runs your implementation!

Here's the order we reccomend implementing Redux in:

### 1. the Store class

Most of redux's functionality is baked into this class! Everything else is
helper functions built around this.

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
result of that (hopefully) pure function and then calls all the listeners.

### 2. combineReducers

Each reducer only recieves a slice of the state (its name!)

```javascript
const combineReducers = (reducers) => (state, action) => nextState;
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

```javascript
const applyMiddlewares = (middlewares) => (store) => (next) => (action) => {};
```
