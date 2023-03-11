import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  isLoggedIn: boolean;
  phoneNumber: string | null;
}

const initialState: IUserState = {
  isLoggedIn: false,
  phoneNumber: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    authentication: (
      state,
      action: PayloadAction<Pick<IUserState, 'isLoggedIn'>>,
    ) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setPhoneNumber: (
      state,
      action: PayloadAction<Pick<IUserState, 'phoneNumber'>>,
    ) => {
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});

export const { authentication, setPhoneNumber } = userSlice.actions;
