import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProveedores, getProveedor as getProveedorService, createProveedor, updateProveedor, deleteProveedor } from '@/services/proveedoresService'; // Asegúrate de importar las funciones

// Estado inicial para manejar las cuentas


const initialState = {
  id: '',
  proveedores: [],
  status: 'idle', // idle, loading, success, fail
  error: null,

  showModal: false,
  proveedor: {},

  formAction: "add",
  statusProveedor: "idle",
  statusModal: "idle",
};
export const fetchAddProveedorAsync = createAsyncThunk("auth/fetchAddProveedorAsync", async (props, { getState }) => {
  const {
    proveedor: { formAction, id },
  } = getState();
  console.log(props)
  const res = await (formAction === "add"
    ? createProveedor(props)
    : updateProveedor({ ...props, id }));
  return res;
});

export const fetchGetProveedorAsync = createAsyncThunk(
  "Proveedor/fetchGetProveedorAsync",
  async (email) => {
    console.log(email)
    
    if (email) {
      const response = await getProveedorService(email);
      console.log(response)
      // setCacheValue("Proveedors", response, 5);
      return response;
    } else {
      const response = await getProveedores();
      console.log(response)
      // setCacheValue("Proveedors", response, 5);
      return response;
    }
  }
);

export const ProveedorSlice = createSlice({
  name: "Proveedor",
  initialState,
  reducers: {
    setFormAction: (
      state,
      action
    ) => {
      state.formAction = action.payload;
    },
    setProveedorToEdit: (state, action) => {
      console.log(action.payload)
      state.id = action.payload.id
      state.proveedor = action.payload
      state.formAction = "update";
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetProveedorAsync.pending, (state) => {
        state.statusProveedor = "loading";
      })
      .addCase(
        fetchGetProveedorAsync.fulfilled,
        (state, action) => {
          state.proveedores = action.payload;
          state.statusProveedor = "success";
        }
      )
      .addCase(fetchGetProveedorAsync.rejected, (state) => {
        state.statusProveedor = "fail";
      })
      .addCase(fetchAddProveedorAsync.pending, (state) => {
        state.statusModal = "loading";
      })
      .addCase(fetchAddProveedorAsync.fulfilled, (state) => {
        state.statusModal = "success";
        state.showModal = false;
      })
      .addCase(fetchAddProveedorAsync.rejected, (state) => {
        state.statusModal = "fail";
      });
  },
});

// Export actions
export const { setFormAction, setProveedorToEdit, setShowModal } =
  ProveedorSlice.actions;
// Definición de selectores
export const getProveedorFields = (state) => {
  console.log(state)
  return {

    id: state.proveedor.proveedor.id,
    nombre_proveedor: state.proveedor.proveedor.nombre_proveedor,
    ciudad: state.proveedor.proveedor.ciudad,
    nombre_sede: state.proveedor.proveedor.nombre_sede,
    correo: state.proveedor.proveedor.correo,
    ciudad_sede: state.proveedor.proveedor.ciudad_sede,
    centro_comercial: state.proveedor.proveedor.centro_comercial,
    fecha: state.proveedor.proveedor.fecha,
    novedades_activo: state.proveedor.proveedor.novedades_activo,
    user_id: state.proveedor.proveedor.user_id
  };
};
export const getProveedor = (state) => state.proveedor.proveedor;
// export const getProveedorImage = (state) => state.proveedor.imagen;
export const getShowModal = (state) => state.proveedor.showModal;
export const getFormAction = (state) => state.proveedor.formAction;
export const getStatusProveedor = (state) =>
  state.proveedor.statusProveedor;
export const getProveedorQuery = (state, query) => {
  if (query) {
    return state.proveedor.proveedores.filter(
      (d) =>
        d.nombre_proveedor.toLowerCase().includes(query) ||
        d.ciudad.toLowerCase().includes(query) ||
        d.centro_comercial.toLowerCase().includes(query)
    );
  } else {
    return state.proveedor.proveedores;
  }
};
export const getStatusModal = (state) => state.proveedor.statusModal;

export default ProveedorSlice.reducer;
