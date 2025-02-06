import axios from "axios";
import { API_URL } from '@/utils/urls';
import { showError } from "@/utils/serviceMessages";

export const createSede = async (sede) => {

    try {
        const data = {
            "nombre_sede": sede.nombre_sede,
            "nit": sede.nit,
            "dv": sede.dv,
            "ciudad": sede.ciudad,
            "celular": sede.celular,
            "centro_comercial": sede.centro_comercial,
            "equipos": sede.equipos.toString(),
            "direccion_local": sede.direccion_local,
            "nombre_empresa": sede.nombre_empresa,
            "empresa_id": typeof sede.empresa_id === 'string' ? parseInt(sede.empresa_id) : sede.empresa_id,

        }


        console.log(data)
        const response = await axios.post(API_URL + "/sedes", data);
        if (response.data.error) {
            showError(response.data.error)
        }
        return response.data;
    } catch (error) {
        console.error('Error creating sede', error);
        showError(`Error al crear la sede, verifica que el código no este en uso o este repetido`)

        throw error;
    }
}

export const getSedes = async () => {
    try {
        const response = await axios.get(API_URL + "/sedes");
        console.log("sedes", response.data)
        if (response.data.length > 0) {
            const data = []
            response.data.map((sede, index) => {
                data[index] = sede;
                // data[index].equipos = typeof sede.equipos === 'string' ? JSON.parse(sede.equipos) : sede.equipos
                data[index].equipos = typeof sede.equipos == 'string' ? sede.equipos.split(",") : sede.equipos
            })
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching sedes', error);

        showError(`${error?.response.data.detail}`)
        throw error;
    }
}

export const sedesForProveedor = async (arrayIds) => {
    try {
        let sedes = []
        arrayIds.map(id => {
            const sede = getSede(id)
            if (sede) sedes.push(sede)
        })
        return sedes
    } catch (error) {
        console.log(error)
        return []
    }
}

// Obtener una sede por ID
export const getSede = async (id) => {
    try {
        const response = await axios.get(`${API_URL + "/sedes"}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sede', error);
        throw error;
    }
}

// Actualizar una sede
export const updateSede = async (sede, id) => {
  
    try {
          console.log("entrooo")
     const data = {
            "nombre_sede": sede.nombre_sede,
            "nit": sede.nit,
            "dv": sede.dv,
            "ciudad": sede.ciudad,
            "celular": sede.celular,
            "centro_comercial": sede.centro_comercial,
            "equipos": sede.equipos.toString(),
            "direccion_local": sede.direccion_local,
            "nombre_empresa": sede.nombre_empresa,
            "empresa_id": typeof sede.empresa_id === 'string' ? parseInt(sede.empresa_id) : sede.empresa_id,

        }
        const response = await axios.put(`${API_URL + "/sedes"}/${id}`, data);
          if (response.data.error) {
            showError(response.data.error)
        }
        return response.data;
    } catch (error) {
        console.error('Error updating sede', error);

        showError(`${error?.response.data.detail}`)
        throw error;
    }
}

// Eliminar una sede
export const deleteSede = async (id) => {
    const sedeId = typeof id === 'string' ? parseInt(id) : id
    try {
        const response = await axios.delete(`${API_URL + "/sedes"}/${sedeId}`);
        if (response.data.error) {
            showError(response.data.error)
        }
        return response.data;
    } catch (error) {
        console.error('Error deleting sede', error);
        throw error;
    }
}