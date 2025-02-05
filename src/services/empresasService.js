import axios from "axios";
import { API_URL } from '@/utils/urls';
  // Crear una nueva empresa
  export const createEmpresa = async (empresa) => {
    empresa.tiendas_vinculadas = empresa.tiendas_vinculadas.toString();
    try {
      const response = await axios.post(`${API_URL}empresa/register`, empresa, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating empresa", error);
      throw error;
    }
  }

  // Obtener todas las empresas
  export const getEmpresas= async () => {
    try {
      const response = await axios.get(`${API_URL}/empresas`);
      return response.data.map((empresa) => ({
        ...empresa,
        tiendas_vinculadas:
          typeof empresa.tiendas_vinculadas === "string"
            ? empresa.tiendas_vinculadas.split(",")
            : empresa.tiendas_vinculadas,
      }));
    } catch (error) {
      console.error("Error fetching empresas", error);
      throw error;
    }
  }

  // Obtener una empresa por ID
  export const getEmpresa= async (id) => {
    try {
      const response = await axios.get(`${API_URL}/empresas/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching empresa", error);
      throw error;
    }
  }

  // Actualizar una empresa
  export const updateEmpresa= async (id, empresa) => {
    empresa.tiendas_vinculadas = empresa.tiendas_vinculadas.toString();
    try {
      const response = await axios.put(`${API_URL}/empresas/${id}`, empresa);
      return response.data;
    } catch (error) {
      console.error("Error updating empresa", error);
      throw error;
    }
  }

  // Eliminar una empresa
  export const deleteEmpresa= async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/empresas/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting empresa", error);
      throw error;
    }
  }

