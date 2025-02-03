import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa localStorage
import authReducer from "./slices/authSlice"; // Asegúrate de que la ruta es correcta
import proveedoresReducer from "./slices/proveedoresSlice"; // Asegúrate de que la ruta es correcta

// Configuración de persistencia
const persistConfig = {
    key: "root",
    storage, // Usa localStorage para persistir el estado
    whitelist: ["auth"], // Solo persistir el reducer de autenticación
};

// Combinación de reducers con persistencia
const rootReducer = combineReducers({
    auth: authReducer,
    proveedor:proveedoresReducer
});

// Aplicar persistencia al reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración del store con persistReducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Evita errores con redux-persist
        }),
});

// Persistor para mantener la sesión
export const persistor = persistStore(store);
