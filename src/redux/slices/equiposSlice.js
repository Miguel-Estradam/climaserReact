
import { getEquipos,createEquipo } from '@/services/equiposService';
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
  sede:{},

  formAction: "add",
  statusEquipos: "idle",
  statusModal: "idle",
  statusModal2: "idle",
};
export const fetchAddEquipoAsync = createAsyncThunk("equipo/fetchAddEquipoAsync", async (props, { getState }) => {
  const {
    equipo: { formAction, id },
  } = getState();
  const res = await (formAction === "add"
    ? createEquipo(props)
    : updateSede({ ...props }, id));
  return res;
});

export const fetchGetEquiposAsync = createAsyncThunk(
  "Equipos/fetchGetEquiposAsync",
  async ({id}) => {
    console.log("entro---",id)
    if (id && id != "") {
      const response = await getEquipos(id);
    // console.log(response)
    // setCacheValue("Sedess", response, 5);
    return response;
   }else{ return []}
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
    setEquipoToEdit: (state, action) => {
      state.id = action.payload.id;
      state.equipo = action.payload
      state.formAction = "update";
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;  
      state.statusModal = 'init'
    },
    setShowModal2: (state, action) => {
      console.log(action.payload)
      state.showModal2 = action.payload.status;
      state.idSede = action.payload.sede ? action.payload.sede.id:"";
      state.sede = action.payload.sede
      console.log(state.sede,state.idSede)
      state.statusModal2 = 'init'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetEquiposAsync.pending, (state) => {
        state.statusEquipos = "loading";
      })
      .addCase(
        fetchGetEquiposAsync.fulfilled,
        (state, action) => {
          state.equipos = action.payload;
          state.statusEquipos = "success";
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
export const { setFormAction, setEquipoToEdit, setShowModal, setShowModal2 } =
  EquiposSlice.actions;
// Definición de selectores
export const getEquiposFields = (state) => {
  return {
    marca: state.equipo.equipo.marca,
    modelo: state.equipo.equipo.modelo,
    modelo_condensadora: state.equipo.equipo.modelo_condensadora,
    serie: state.equipo.equipo.serie,
    tipo: state.equipo.equipo.tipo,
    capacidad: state.equipo.equipo.capacidad,
    tipo_refrigerante: state.equipo.equipo.tipo_refrigerante,
    observaciones: state.equipo.equipo.observaciones,
    consumo_electrico: state.equipo.equipo.consumo_electrico,
    voltaje: state.equipo.equipo.voltaje,
    ubicacion: state.equipo.equipo.ubicacion,
    fase: state.equipo.equipo.fase,
    sede_id: state.equipo.equipo.sede_id,
  };
};
export const getEquipo = (state) => state.equipo.equipo;
// export const getSedesImage = (state) => state.equipo.imagen;
export const getShowModal = (state) => state.equipo.showModal;
export const getShowModal2 = (state) => state.equipo.showModal2;
export const getFormAction = (state) => state.equipo.formAction;
export const getSedeEquipo = (state) => state.equipo.sede;
export const getStatusEquipos = (state) =>
  state.equipo.statusEquipos;
export const getEquiposQuery = (state, query) => {
  if (query) {
    return state.equipo.equipos.filter(
      (d) =>
        d.marca.toLowerCase().includes(query) ||
        d.modelo.toLowerCase().includes(query) ||
        d.modelo_condensadora.toLowerCase().includes(query) ||
        d.serie.toLowerCase().includes(query) ||
        d.tipo.toLowerCase().includes(query)
    );
  } else {
    return state.equipo.equipos;
  }
};
export const getStatusModal = (state) => state.equipo.statusModal;

export default EquiposSlice.reducer;
