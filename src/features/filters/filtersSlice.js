import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checked: [],
  search: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    status: (state, action) => {
      // const indexOfExistedProject = state?.checked?.findIndex((obj) => obj.id === action.payload.id);
      // if (indexOfExistedProject === -1) {
      //   state.checked.push(action.payload);
      // } else {
      //   state.checked.splice(indexOfExistedProject, 1);
      // }
      if (state.checked.includes(action.payload)) {
        const index = state.checked.indexOf(action.payload);
        let arr = [...state.checked];
        arr.splice(index, 1);
        state.checked = arr;
      } else state.checked.push(action.payload);
    },
    search: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { status, search } = filterSlice.actions;
