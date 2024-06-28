import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "@/store/reducers/audio/reducer";

const rootReducer = combineReducers({
  audio: audioReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type StateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
