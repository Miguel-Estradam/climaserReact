
import { createSede, getSedes, updateSede } from '@/services/sedesServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Estado inicial para manejar las cuentas


const initialState = {
  id: '',
  sedes: [],
  status: 'idle', // idle, loading, success, fail
  error: null,

  showModal: false,
  sede: {},

  formAction: "add",
  statusSedes: "idle",
  statusModal: "idle",
};
export const fetchAddSedeAsync = createAsyncThunk("auth/fetchAddSedeAsync", async (props, { getState }) => {
  const {
    sede: { formAction, id },
  } = getState();
  const res = await (formAction === "add"
    ? createSede(props)
    : updateSede({ ...props, id }));
  return res;
});

export const fetchGetSedesAsync = createAsyncThunk(
  "Sedes/fetchGetSedesAsync",
  async (forceFetch) => {
    const response = await getSedes();
    console.log(response)
    // setCacheValue("Sedess", response, 5);
    return response;
  }
);

export const SedesSlice = createSlice({
  name: "sede",
  initialState,
  reducers: {
    setFormAction: (
      state,
      action
    ) => {
      state.formAction = action.payload;
    },
    setSedeToEdit: (state, action) => {
      state.id = action.payload.id;
      state.sede = action.payload
      state.formAction = "update";
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetSedesAsync.pending, (state) => {
        state.statusSedes = "loading";
      })
      .addCase(
        fetchGetSedesAsync.fulfilled,
        (state, action) => {
          state.sedes = action.payload;
          state.statusSedes = "success";
        }
      )
      .addCase(fetchGetSedesAsync.rejected, (state) => {
        state.statusSedes = "fail";
      })
      .addCase(fetchAddSedeAsync.pending, (state) => {
        state.statusModal = "loading";
      })
      .addCase(fetchAddSedeAsync.fulfilled, (state) => {
        state.statusModal = "success";
        state.showModal = false;
      })
      .addCase(fetchAddSedeAsync.rejected, (state) => {
        state.statusModal = "fail";
      });
  },
});

// Export actions
export const { setFormAction, setSedesToEdit, setShowModal } =
  SedesSlice.actions;
// Definición de selectores
export const getSedeFields = (state) => {
  return {
    nombre_sede: state.sede.sede.nombre_sede,
    nit: state.sede.sede.nit,
    ciudad: state.sede.sede.ciudad,
    direccion: state.sede.sede.direccion,
    telefono: state.sede.sede.telefono,
    correo: state.sede.sede.correo,
    contacto: state.sede.sede.contacto,
    tiendas_vinculadas: state.sede.sede.tiendas_vinculadas,
    created_at: state.sede.precio,
  };
};
export const getSede = (state) => state.sede.sede;
// export const getSedesImage = (state) => state.sede.imagen;
export const getShowModal = (state) => state.sede.showModal;
export const getFormAction = (state) => state.sede.formAction;
export const getStatusSedes = (state) =>
  state.sede.statusSedes;
export const getSedesQuery = (state, query) => {
  if (query) {
    return state.sede.sedes.filter(
      (d) =>
        d.nombre_Sedes.toLowerCase().includes(query) ||
        d.ciudad.toLowerCase().includes(query) ||
        d.centro_comercial.toLowerCase().includes(query)
    );
  } else {
    return state.sede.sedes;
  }
};
export const getStatusModal = (state) => state.sede.statusModal;

export default SedesSlice.reducer;
