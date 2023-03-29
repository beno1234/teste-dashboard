import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type themeType = {
  mode: "dark" | "light",
  userId: string
}

const initialState: themeType = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
