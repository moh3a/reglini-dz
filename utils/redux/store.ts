import { useMemo } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const throttle = require("lodash/throttle");

import { loadState, saveState } from "../localState";

// REDUCERS
import productSlice from "./productSlice";
import productsSlice from "./productsSlice";
// import authSlice from "./authSlice";
import aeapiSlice from "./aeapiSlice";
import userSlice from "./userSlice";

let store: any;

// INITIAL STATE
const initialState = {};
const persistedState = loadState();

// ROOT REDUCER
const reducer = combineReducers({
  product: productSlice,
  products: productsSlice,
  // auth: authSlice,
  aeapi: aeapiSlice,
  user: userSlice,
});

// ADD THE REDUX THUNK MIDDLEWARE FOR ASYNC FUNCTIONS
const middleware = [thunk];

// CREATE STORE FUNCTION
function initStore(preloadedState = persistedState) {
  return createStore(
    // persistedReducer,
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  store.subscribe(
    throttle(() => {
      // saveState({ user: store.getState().user });
    }, 1000)
  );
  return store;
}

export type RootState = ReturnType<typeof store.getState>;
