import { useMemo } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// REDUCERS
import aeapiSlice from "./aeapiSlice";
import financeSlice from "./financeSlice";
import userSlice from "./userSlice";
import blogsSlice from "./blogsSlice";

let store: any;

// INITIAL STATE
const initialState = {};

// ROOT REDUCER
const reducer = combineReducers({
  aeapi: aeapiSlice,
  finance: financeSlice,
  user: userSlice,
  blogs: blogsSlice,
});

// ADD THE REDUX THUNK MIDDLEWARE FOR ASYNC FUNCTIONS
const middleware = [thunk];

// CREATE STORE FUNCTION
function initStore(preloadedState = initialState) {
  return createStore(
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
  return store;
}

export type RootState = ReturnType<typeof store.getState>;
