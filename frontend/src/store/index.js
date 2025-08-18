import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "@/features/cars/carsSlice";
import authReducer from "@/features/auth/authSlice";
import brandsReducer from "@/features/brands/brandsSlice";
import favoritesReducer from "@/features/favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    auth: authReducer,
    brands: brandsReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
