import { createEmpresa, getEmpresas, updateEmpresa } from '@/services/empresasService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Estado inicial para manejar las cuentas


const initialState = {
    id:'',
  empresas: [],
  status: 'idle', // idle, loading, success, fail
    error: null,
  
    showModal: false,
    empresa: {},
  
  formAction: "add",
  statusEmpresas: "idle",
  statusModal: "idle",
};
export const fetchAddEmpresaAsync = createAsyncThunk("auth/fetchAddEmpresaAsync", async (props, { getState }) => {
  const {
    empresa: { formAction, id },
  } = getState();
  const res = await (formAction === "add"
    ? createEmpresa(props)
    : updateEmpresa({ ...props, id }));
  return res;
});

export const fetchGetEmpresasAsync = createAsyncThunk(
  "Empresa/fetchGetEmpresasAsync",
  async (forceFetch) => {
      const response = await getEmpresas();
      console.log(response)
    // setCacheValue("Empresas", response, 5);
    return response;
  }
);

export const EmpresaSlice = createSlice({
  name: "empresa",
  initialState,
  reducers: {
    setFormAction: (
      state,
      action
    ) => {
      state.formAction = action.payload;
    },
    setEmpresaToEdit: (state, action) => {
        state.id = action.payload.id;
        state.empresa = action.payload.empresa
      state.formAction = "update";
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetEmpresasAsync.pending, (state) => {
        state.statusEmpresas = "loading";
      })
      .addCase(
        fetchGetEmpresasAsync.fulfilled,
        (state, action) => {
          state.empresa = action.payload;
          state.statusEmpresas = "success";
        }
      )
      .addCase(fetchGetEmpresasAsync.rejected, (state) => {
        state.statusEmpresas = "fail";
      })
      .addCase(fetchAddEmpresaAsync.pending, (state) => {
        state.statusModal = "loading";
      })
      .addCase(fetchAddEmpresaAsync.fulfilled, (state) => {
        state.statusModal = "success";
        state.showModal = false;
      })
      .addCase(fetchAddEmpresaAsync.rejected, (state) => {
        state.statusModal = "fail";
      });
  },
});

// Export actions
export const { setFormAction, setEmpresaToEdit, setShowModal } =
  EmpresaSlice.actions;
// Definición de selectores
export const getEmpresaFields = (state) => {
  return {
    nombre_empresa: state.empresa.empresa.nombre_Empresa,
    nit:state.empresa.empresa.nit,
    ciudad:state.empresa.empresa.ciudad,
    direccion: state.empresa.empresa.direccion,
    telefono: state.empresa.empresa.telefono,
    correo: state.empresa.empresa.correo,
    contacto: state.empresa.empresa.contacto,
    tiendas_vinculadas: state.empresa.empresa.tiendas_vinculadas,
    created_at: state.empresa.precio,
  };
};
export const getEmpresa = (state) => state.empresa.empresa;
// export const getEmpresaImage = (state) => state.empresa.imagen;
export const getShowModal = (state) => state.empresa.showModal;
export const getFormAction = (state) => state.empresa.formAction;
export const getStatusEmpresa = (state) =>
  state.empresa.statusEmpresas;
export const getEmpresasQuery = (state , query) => {
  if (query) {
    return state.empresa.empresa.filter(
      (d) =>
        d.nombre_empresa.toLowerCase().includes(query) ||
        d.ciudad.toLowerCase().includes(query) ||
        d.centro_comercial.toLowerCase().includes(query) 
    );
  } else {
    return state.empresa.empresa;
  }
};
export const getStatusModal = (state) => state.empresa.statusModal;

export default EmpresaSlice.reducer;
