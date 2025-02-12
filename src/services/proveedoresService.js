import axios from 'axios';
import { showAlert, showError, showSuccess } from '../utils/serviceMessages'; // Asegúrate de que estas funciones existan
import { API_URL } from '@/utils/urls'; // Asegúrate de que esta URL esté correctamente configurada

// Crear un nuevo proveedor
export const createProveedor = async (proveedor) => {
  try {
    const user = {
      email: proveedor.correo,
      password: proveedor.password,
      name: proveedor.nombre_proveedor,
      type: "proveedor",
      created_at: Date.now(),
    };

    const responseUser = await axios.post(`${API_URL}/user/register`, user);
    if (responseUser.data) {
      const prove = {
        nombre_proveedor: proveedor.nombre_proveedor,
        ciudad: proveedor.ciudad,
        nombre_sede: JSON.stringify(proveedor.nombre_sede),
        ciudad_sede: proveedor.ciudad,
        centro_comercial: "",
        fecha: Date.now(),
        correo: proveedor.correo,
        novedades_activo: true,
        user_id: responseUser.data.id,
      };
      const response = await axios.post(`${API_URL}/register/proveedor`, prove);
      showSuccess('Proveedor creado con éxito');
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    showError('Error al crear proveedor');
    throw error;
  }
};

// Obtener todos los proveedores
export const getProveedores = async () => {
  let proveedores = []
  try {
    const response = await axios.get(`${API_URL}/proveedores`);
    if (response.data) {
      response.data.map((proveedor, index) => {
        console.log(typeof proveedor.nombre_sede)
        proveedores[index] = proveedor
        proveedores[index].fecha = proveedor.fecha.split("T")[0]
        proveedores[index].nombre_sede = JSON.parse(proveedor.nombre_sede)
      })
    }
    return proveedores;
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    showError('Error al obtener proveedores');
    throw error;
  }
};

// Obtener un proveedor por ID
export const getProveedor = async (email) => {
  try {
    const body = { proveedor_email: email };
    const response = await axios.post(`${API_URL}/proveedor`, body);
    const proveedor = response.data ? response.data : {}
    proveedor.fecha = proveedor.fecha.split("T")[0]
    proveedor.nombre_sede = JSON.parse(proveedor.nombre_sede)
    return proveedor;
  } catch (error) {
    console.error('Error al obtener proveedor:', error);
    showError('Error al obtener proveedor');
    throw error;
  }
};

// Actualizar un proveedor
export const updateProveedor = async (proveedor) => {
  try {

    proveedor.nombre_sede = JSON.stringify(proveedor.nombre_sede);
    console.log(proveedor, "aaaaaaaaaaaaaaa")
    const response = await axios.put(`${API_URL}/proveedor/${proveedor.id}`, proveedor);
    showSuccess('Proveedor actualizado');
    return response.data;
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    showError('Error al actualizar proveedor');
    throw error;
  }
};

// Eliminar un proveedor
export const deleteProveedor = async (id) => {
  try {
    await axios.delete(`${API_URL}/proveedor/${id}`);
    showSuccess('Proveedor eliminado con éxito');
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    showError('Error al eliminar proveedor');
    throw error;
  }
};
