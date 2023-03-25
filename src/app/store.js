import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/app/apiSlice';
import filterSlice from '../features/filter/filterSlice';
import projectReducer from '../features/projects/projectSlice';
import teamReducer from '../features/team/teamSlice';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    teams: teamReducer,
    projects: projectReducer,
    filters: filterSlice
    
  },
  devTools:process.env.NODE_ENV !== "production",
  
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
});
