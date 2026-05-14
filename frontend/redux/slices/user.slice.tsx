import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserInterface } from "@/types/user.interface";

type UserState = {
  user: UserInterface | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    // Définit complètement l'utilisateur
    setUserReducer: (state, action: PayloadAction<UserInterface | null>) => {
      state.user = action.payload;
    },

    // Met à jour certaines propriétés
    updateUserReducer: (
      state,
      action: PayloadAction<Partial<UserInterface>>,
    ) => {
      if (!state.user) return;

      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    // Logout
    clearUserReducer: (state) => {
      state.user = null;
    },
  },
});

export const { setUserReducer, updateUserReducer, clearUserReducer } =
  userSlice.actions;

export default userSlice.reducer;
