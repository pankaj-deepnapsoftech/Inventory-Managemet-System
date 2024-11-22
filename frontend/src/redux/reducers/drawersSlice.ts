import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Product Drawer
  isAddProductDrawerOpened: false,
  isUpdateProductDrawerOpened: false,
  isProductDetailsDrawerOpened: false,

  // Store Drawer
  isAddStoreDrawerOpened: false,
  isUpdateStoreDrawerOpened: false,
  isStoreDetailsDrawerOpened: false,

  // Buyer Drawer
  isAddBuyerDrawerOpened: false,
  isUpdateBuyerDrawerOpened: false,
  isBuyerDetailsDrawerOpened: false
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
      state.isAddStoreDrawerOpened = true;
    },
    closeAddStoreDrawer: (state)=>{
      state.isAddStoreDrawerOpened = false;
    },
    // Update Store Drawer
    openUpdateStoreDrawer: (state)=>{
      state.isUpdateStoreDrawerOpened = true;
    },
    closeUpdateStoreDrawer: (state)=>{
      state.isUpdateStoreDrawerOpened = false;
    },
    // Store Details Drawer
    openStoreDetailsDrawer: (state)=>{
      state.isStoreDetailsDrawerOpened = true;
    },
    closeStoreDetailsDrawer: (state)=>{
      state.isStoreDetailsDrawerOpened = false;
    },
    // Add Buyer Drawer
    openAddBuyerDrawer: (state)=>{
      state.isAddBuyerDrawerOpened = true;
    },
    closeAddBuyerDrawer: (state)=>{
      state.isAddBuyerDrawerOpened = false;
    },
    // Update Store Drawer
    openUpdateBuyerDrawer: (state)=>{
      state.isUpdateBuyerDrawerOpened = true;
    },
    closeUpdateBuyerDrawer: (state)=>{
      state.isUpdateBuyerDrawerOpened = false;
    },
    // Store Details Drawer
    openBuyerDetailsDrawer: (state)=>{
      state.isBuyerDetailsDrawerOpened = true;
    },
    closeBuyerDetailsDrawer: (state)=>{
      state.isBuyerDetailsDrawerOpened = false;
    }
  },
});

export default drawersSlice;
export const { openAddProductDrawer, closeAddProductDrawer, openUpdateProductDrawer, closeUpdateProductDrawer, openProductDetailsDrawer, closeProductDetailsDrawer, openAddStoreDrawer, closeAddStoreDrawer, openUpdateStoreDrawer, closeUpdateStoreDrawer, openStoreDetailsDrawer, closeStoreDetailsDrawer, openAddBuyerDrawer, closeAddBuyerDrawer, openUpdateBuyerDrawer, closeUpdateBuyerDrawer, openBuyerDetailsDrawer, closeBuyerDetailsDrawer } =
  drawersSlice.actions;
