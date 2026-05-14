import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '@/interfaces/user.interface';
import { ArticleInterface } from '@/interfaces/article.interface';

const initialState: {
  user: UserInterface | null;
  articles: ArticleInterface[];
} = {
  user: null,
  articles: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserReducer: (state, action) => {
      const data: { user: UserInterface } = action.payload;
      state.user = data.user;
    },
    updateUserReducer: (state, action) => {
      const data: { user: UserInterface } = action.payload;

      state.user = { ...state.user, ...data.user };
    },
  },
});

export const { setUserReducer, updateUserReducer } = userSlice.actions;

export default userSlice.reducer;
