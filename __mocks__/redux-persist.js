export const autoRehydrate = () =>
  next =>
    (reducer, initialState, enhancer) => {
      const store = next(reducer, initialState, enhancer);
      return {
        ...store,
        replaceReducer: newReducer => newReducer,
      };
    };

export const persistStore = (store, config, cb) => cb();
