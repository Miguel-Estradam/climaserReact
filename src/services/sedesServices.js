import axios from "axios";
import { API_URL } from '@/utils/urls';

export const createSede = async (sede) => {

    try {
        const data = {
            "nombre_sede": sede.nombre_sede,
            "nit": sede.nit,
            "ciudad": sede.ciudad,
            "centro_comercial": sede.centro_comercial,
            "equipos": sede.equipos.toString(),
            "direccion_local": sede.direccion_local,
            "nombre_empresa": sede.nombre_empresa,
            "empresa_id": typeof sede.empresa_id === 'string' ? parseInt(sede.empresa_id) : sede.empresa_id,
            "created_at": sede.created_at
        }


        console.log(data)
        const response = await axios.post(API_URL + "/sedes", data);
        return response.data;
    } catch (error) {
        console.error('Error creating sede', error);
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
export const updateSede = async (id, sede) => {
    const data = {
        "nombre_sede": sede.nombre_sede,
        "nit": sede.nit,
        "ciudad": sede.ciudad,
        "centro_comercial": sede.centro_comercial,
        "equipos":  typeof sede.equipos == 'string' ? sede.equipos.split(",") : empresa.equipos,
        "direccion_local": sede.direccion_local,
        "nombre_empresa": sede.nombre_empresa,
        "empresa_id": typeof sede.empresa_id === 'string' ? parseInt(sede.empresa_id) : sede.empresa_id,
        "created_at": sede.created_at
    }
    try {
        const response = await axios.put(`${API_URL + "/sedes"}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating sede', error);
        throw error;
    }
}

// Eliminar una sede
export const deleteSede = async (id) => {
    const sedeId = typeof id === 'string' ? parseInt(id) : id
    try {
        const response = await axios.delete(`${API_URL + "/sedes"}/${sedeId}`);
        if (response.status == 400) {
            showError("Existen sedes vinculadas")
        }
        return response.data;
    } catch (error) {
        console.error('Error deleting sede', error);
        throw error;
    }
}