import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Address from "@/lib/types/address";
interface AddressState {
  address: Address | null;
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  address: null,
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<Address>) => {
      state.address = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAddress: (state) => {
      state.address = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setAddress, setLoading, setError, clearAddress } = addressSlice.actions;
export default addressSlice.reducer;
