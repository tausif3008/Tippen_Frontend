import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./RootReduce/RootReducer";
import { RootSaga } from "./Sagas/RootSags";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: RootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(RootSaga);
export default store;
