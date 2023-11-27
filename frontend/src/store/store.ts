import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { authApi, storage } from 'services/services';

const extraArgument = {
  authApi,
  storage,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    });
  },
});

export { extraArgument, store };
