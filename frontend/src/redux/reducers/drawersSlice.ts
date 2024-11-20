import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Product Drawer
  isAddProductDrawerOpened: false,
  isUpdateProductDrawerOpened: false,
  isProductDetailsDrawerOpened: false,

  // Store Drawer
  isAddStoreDrawerOpened: false,
  isUpdateStoreDrawerOpened: false,
  isStoreDetailsDrawerOpened: false
};

const drawersSlice = createSlice({
  name: "drawers",
  initialState,
  reducers: {
    // Add Product Drawer
    openAddProductDrawer: (state) => {
      state.isAddProductDrawerOpened = true;
    },
    closeAddProductDrawer: (state) => {
      state.isAddProductDrawerOpened = false;
    },
    // Update Product Drawer
    openUpdateProductDrawer: (state) => {
      state.isUpdateProductDrawerOpened = true;
    },
    closeUpdateProductDrawer: (state) => {
      state.isUpdateProductDrawerOpened = false;
    },
    // Product Details Drawer
    openProductDetailsDrawer: (state) => {
      state.isProductDetailsDrawerOpened = true;
    },
    closeProductDetailsDrawer: (state) => {
      state.isProductDetailsDrawerOpened = false;
    },
    // Add Store Drawer
    openAddStoreDrawer: (state)=>{
      state.isAddProductDrawerOpened = true;
    },
    closeAddStoreDrawer: (state)=>{
      state.isAddProductDrawerOpened = false;
    },
    // Update Store Drawer
    openUpdateStoreDrawer: (state)=>{
      state.isUpdateStoreDrawerOpened = true;
    },
    closeUpdateStoreDrawer: (state)=>{
      state.isUpdateProductDrawerOpened = false;
    },
    // Product Details Drawer
    openStoreDetailsDrawer: (state)=>{
      state.isProductDetailsDrawerOpened = true;
    },
    closeStoreDetailsDrawer: (state)=>{
      state.isProductDetailsDrawerOpened = false;
    }
  },
});

export default drawersSlice;
export const { openAddProductDrawer, closeAddProductDrawer, openUpdateProductDrawer, closeUpdateProductDrawer, openProductDetailsDrawer, closeProductDetailsDrawer, openAddStoreDrawer, closeAddStoreDrawer, openUpdateStoreDrawer, closeUpdateStoreDrawer, openStoreDetailsDrawer, closeStoreDetailsDrawer } =
  drawersSlice.actions;
