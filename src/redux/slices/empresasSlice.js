import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProveedores, getProveedor as getProveedorService, createProveedor, updateProveedor, deleteProveedor } from '@/services/proveedoresService'; // Asegúrate de importar las funciones

// Estado inicial para manejar las cuentas


const initialState = {
    id:'',
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
    Proveedor: { formAction, id },
  } = getState();
  const res = await (formAction === "add"
    ? addProveedor(props)
    : updateProveedor({ ...props, id }));
  return res;
});

export const fetchGetProveedorAsync = createAsyncThunk(
  "Proveedor/fetchGetProveedorAsync",
  async (forceFetch) => {
      const response = await getProveedores();
      console.log(response)
    // setCacheValue("Proveedors", response, 5);
    return response;
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
        state.id = action.payload.id;
        state.proveedor = action.payload.proveedor
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
          state.proveedor = action.payload;
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
  return {
    nombre_proveedor: state.proveedor.proveedor.nombre_proveedor,
    ciudad:state.proveedor.proveedor.nombre_proveedor.ciudad,
    nombre_sede:state.proveedor.proveedor.nombre_sede,
    ciudad_sede: state.proveedor.proveedor.ciudad_sede,
    centro_comercial: state.proveedor.proveedor.centro_comercial,
    fecha: state.proveedor.proveedor.nombre_proveedor,
    correo: state.Proveedor.precio,
    novedades_activo: state.Proveedor.nombreDescriptivo,
  };
};
export const getProveedor = (state) => state.proveedor.Proveedor;
// export const getProveedorImage = (state) => state.Proveedor.imagen;
export const getShowModal = (state) => state.proveedor.showModal;
export const getFormAction = (state) => state.proveedor.formAction;
export const getStatusProveedor = (state) =>
  state.proveedor.statusProveedor;
export const getProveedorQuery = (state , query) => {
  if (query) {
    return state.proveedor.proveedor.filter(
      (d) =>
        d.nombre_proveedor.toLowerCase().includes(query) ||
        d.ciudad.toLowerCase().includes(query) ||
        d.centro_comercial.toLowerCase().includes(query) 
    );
  } else {
    return state.proveedor.proveedor;
  }
};
export const getStatusModal = (state) => state.Proveedor.statusModal;

export default ProveedorSlice.reducer;
