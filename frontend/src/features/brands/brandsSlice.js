import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBrands } from "@/services/api";

export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async () => {
    const response = await getAllBrands();
    return response;
  }
);

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default brandsSlice.reducer;