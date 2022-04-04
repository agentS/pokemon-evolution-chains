import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./RootReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const configureStore = (preloadState: any) =>
    createStore(rootReducer, preloadState, applyMiddleware(thunk, logger));
export { configureStore };
