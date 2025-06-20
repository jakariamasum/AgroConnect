import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  urls: string[];
}

const initialState: ImageState = {
  urls: [],
};

const uploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages(state, action: PayloadAction<string[]>) {
      state.urls = action.payload;
    },
    addImage(state, action: PayloadAction<string>) {
      state.urls.push(action.payload);
    },
    removeImage(state, action: PayloadAction<number>) {
      state.urls.splice(action.payload, 1);
    },
  },
});

export const { setImages, addImage, removeImage } = uploadSlice.actions;
export default uploadSlice.reducer;
