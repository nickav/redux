export default class Store {
  constructor(rootReducer, initialState = {}) {
    if (typeof rootReducer !== 'function') {
      throw `Store.constructor - rootReducer must be a function!`;
    }

    this.state = initialState;
    this.reducer = rootReducer;
    this.listeners = [];
  }

  getState () {
    return this.state;
  }

  subscribe ( listener ) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(e => e !== listener);
    }
  }

  replaceReducer ( nextReducer ) {
    if (typeof nextReducer !== 'function') {
      throw `Store.replaceReducer - nextReducer must be a function!`;
    }

    this.reducer = nextReducer;
  }

  dispatch (action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(listener => listener());
  }
}