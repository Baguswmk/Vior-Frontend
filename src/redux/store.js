import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import reducers here
import { userReducer } from "./reducers/user";
import { productReducer } from "./reducers/product";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";
import { withdrawReducers } from "./reducers/withdraw";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    withdraw: withdrawReducers,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export default store;
