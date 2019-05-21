const applyMiddlewares = (middlewares) => {
  return store => next =>
    middlewares.slice().reverse().reduce((next, middleware) => middleware(store)(next), next);
}

export default applyMiddlewares;