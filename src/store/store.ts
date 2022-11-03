import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { noteAPI } from '../services/noteService'
import postsReducer from './reducers/postSclie'
import autchReducer from './reducers/authSlice'
import { authAPI } from '../services/authService'

const rootReducer = combineReducers({
  postsReducer,
  autchReducer,
  [noteAPI.reducerPath]: noteAPI.reducer,
  [authAPI.reducerPath] : authAPI.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(noteAPI.middleware).concat(authAPI.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']

