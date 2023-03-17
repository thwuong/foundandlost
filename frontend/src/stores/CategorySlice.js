import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: {},
  },
  reducers: {
    addCategory: (state, actions) => {
      state.categories = [...state.categories, actions.payload.category];
    },
    saveCategories: (state, actions) => {
      state.categories = actions.payload.categories;
    },
    removeCategory: (state, actions) => {
      state.categories = state.categories.filter(
        (category) => category.id !== actions.payload
      );
    },
    selectedCategory: (state, actions) => {
      state.category = actions.payload.category;
    },
    updateCategory: (state, actions) => {
      state.categories = state.categories.map((category) => {
        if (category.id === actions.payload.categoryId) {
          category.typeName = actions.payload.typeName;
        }
        return category;
      });
    },
  },
});
export const {
  addCategory,
  saveCategories,
  removeCategory,
  selectedCategory,
  updateCategory,
} = categorySlice.actions;
export default categorySlice.reducer;
