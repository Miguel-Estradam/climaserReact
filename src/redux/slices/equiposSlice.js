
import { createEquipo, getEquipos } from '@/services/equiposService';
import { createSede, getSedes, updateSede } from '@/services/sedesServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Estado inicial para manejar las cuentas


const initialState = {
  id: '',
  idSede:'',
  equipos: [],
  status: 'idle', // idle, loading, success, fail
  error: null,

  showModal: false,
  showModal2: false,
  showModalAll: false,
  equipo: {},

  formAction: "add",
  statusEquipos: "idle",
  statusModal: "idle",
  statusModal2: "idle",
};
export const fetchAddEquipoAsync = createAsyncThunk("equipo/fetchAddEquipoAsync", async (props, { getState }) => {
  const {
    sede: { formAction, id },
  } = getState();
  const res = await (formAction === "add"
    ? createEquipo(props)
    : updateSede({ ...props }, id));
  return res;
});

export const fetchGetEquiposAsync = createAsyncThunk(
  "Equipos/fetchGetEquiposAsync",
  async (forceFetch) => {
    
    const response = await getEquipos(id);
    // console.log(response)
    // setCacheValue("Sedess", response, 5);
    return response;
  }
);

export const EquiposSlice = createSlice({
  name: "equipo",
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
      state.equipo = action.payload
      state.formAction = "update";
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload.status;  
      state.statusModal = 'init'
    },
    setShowModal2: (state, action) => {
      state.showModal2 = action.payload.status;
      state.idSede = action.payload.id;
      state.statusModal = 'init'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetEquiposAsync.pending, (state) => {
        state.statusSedes = "loading";
      })
      .addCase(
        fetchGetEquiposAsync.fulfilled,
        (state, action) => {
          state.sedes = action.payload;
          state.statusSedes = "success";
        }
      )
      .addCase(fetchGetEquiposAsync.rejected, (state) => {
        state.statusSedes = "fail";
      })
      .addCase(fetchAddEquipoAsync.pending, (state) => {
        state.statusModal = "loading";
      })
      .addCase(fetchAddEquipoAsync.fulfilled, (state) => {
        state.statusModal = "success";
        state.showModal = false;
      })
      .addCase(fetchAddEquipoAsync.rejected, (state) => {
        state.statusModal = "fail";
      });
  },
});

// Export actions
export const { setFormAction, setSedeToEdit, setShowModal, se } =
  EquiposSlice.actions;
// Definición de selectores
export const getSedeFields = (state) => {
  return {
    marca: state.equipo.equipo.nombre_sede,
    modelo: state.equipo.equipo.nit,
    modelo_condensadora: state.equipo.equipo.dv,
    serie: state.equipo.equipo.ciudad,
    tipo: state.equipo.equipo.celular,
    capacidad: state.equipo.equipo.centro_comercial,
    tipo_refrigerante: state.equipo.equipo.equipos,
    tipo_refrigerante: state.equipo.equipo.direccion_local,
    observaciones: state.equipo.equipo.nombre_empresa,
    sede_id: state.equipo.equipo.empresa_id,
  };
};
export const getSede = (state) => state.equipo.equipo;
// export const getSedesImage = (state) => state.equipo.imagen;
export const getShowModal = (state) => state.equipo.showModal;
export const getShowModal2 = (state) => state.equipo.showModal2;
export const getFormAction = (state) => state.equipo.formAction;
export const getStatusSedes = (state) =>
  state.equipo.statusSedes;
export const getSedesQuery = (state, query) => {
  if (query) {
    return state.equipo.equipos.filter(
      (d) =>
        d.nombre_sede.toLowerCase().includes(query) ||
        d.ciudad.toLowerCase().includes(query) ||
        d.nit.toLowerCase().includes(query) ||
        d.direccion_local.toLowerCase().includes(query) ||
        d.centro_comercial.toLowerCase().includes(query)
    );
  } else {
    return state.equipo.equipos;
  }
};
export const getStatusModal = (state) => state.equipo.statusModal;

export default EquiposSlice.reducer;
