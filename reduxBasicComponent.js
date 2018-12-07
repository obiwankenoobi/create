const basicActions = `import { ADD_SOMETHING } from "../actions/types";

export const _addSomething = () => dispatch => {
  dispatch({
    type: ADD_SOMETHING,
    payload: { key: "value" }
  });
};`;

const basicTypes = `export const ADD_SOMETHING = "ADD_SOMETHING"`;

const basicIndexReducers = `import { combineReducers } from "redux";
import mainReducers from "../reducers/mainReducer";

// function to combine reducers and state to one store to the whole app
// meanes - you can have as many reducers as you like

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// to add more states to the main store simply create new reducer
// and import it - give it a name to access it - (i.e. <reducerOne>) and thats all
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export default combineReducers({
  mainReducers
});`;

const basicReducers = `import { ADD_SOMETHING } from "../actions/types";

const initialState = {
  someValue: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SOMETHING:
      return {
        ...state,
        someValue: action.payload
      };

    default:
      return state;
  }
}`;

const basicStore = `import {
  createStore,
  applyMiddleware,
  compose // Composes functions from right to left. This is a functional programming utility, and is included in Redux as a convenience.
} from "redux";

// Redux Thunk middleware allows you to write action creators that return a function instead of an action.
// The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
// The inner function receives the store methods dispatch and getState as parameters.
// MOTIVATION: to be able use async function on actions.
import thunk from "redux-thunk";

import mainReducers from "./reducers";

const initialState = {}; // initial state obj

// array of middleware to use with redux
const middleware = [thunk];

const store = createStore(
  // <createStore> creating the store for the app
  mainReducers, // here we pass <mainReducers> which is the combined reducers from /reducers/index.js
  initialState, // initial state object
  compose(applyMiddleware(...middleware))
);

export default store;`;

module.exports = {
  basicActions,
  basicIndexReducers,
  basicReducers,
  basicStore,
  basicStore,
  basicTypes
};
