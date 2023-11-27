import { createReducer } from '@reduxjs/toolkit';
import { UserByIdResponseDto } from 'common/types/types';
import { DataStatus } from 'common/enums/enums';
import { signIn, signUp, loadCurrentUser } from './actions';

type State = {
  dataStatus: DataStatus;
  user: UserByIdResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signUp.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(signUp.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(signUp.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });
  builder.addCase(signIn.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(signIn.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(signIn.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });
  builder.addCase(loadCurrentUser.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(loadCurrentUser.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.user = null;
  });
});

export { reducer };
