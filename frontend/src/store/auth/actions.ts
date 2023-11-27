import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageKey } from 'common/enums/enums';
import {
  UserSignUpRequestDto,
  UserSignInRequestDto,
  UserByIdResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<
  UserByIdResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signUp(registerPayload);

  storage.setItem(StorageKey.TOKEN, token);

  return user;
});

const signIn = createAsyncThunk<
  UserByIdResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (loginPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signIn(loginPayload);

  storage.setItem(StorageKey.TOKEN, token);

  return user;
});

const loadCurrentUser = createAsyncThunk<
  UserByIdResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.LOAD_CURRENT_USER, async (_payload, { extra }) => {
  const { authApi } = extra;
  const user = await authApi.getCurrentUser();

  return user;
});

export { signUp, signIn, loadCurrentUser };