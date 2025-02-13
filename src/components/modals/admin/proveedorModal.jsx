


import { Formik } from "formik";
import React, { useEffect, useState } from "react";
// import {
//   fetchAddProductAsync,
//   fetchGetProductsAsync,
//   getproveedorFields,
//   getFormAction,
//   getShowModal,
//   setFormAction,
//   setShowModal,
//   getStatusModal,
//   getProductImage,
// } from "../../redux/productSlice";
import * as Yup from "yup";
import { Button, Dialog, DialogBody, DialogHeader, Input, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProveedorAsync, setShowModal, getFormAction, getShowModal, getStatusModal, getProveedorFields, fetchAddProveedorAsync, setFormAction } from "@/redux/slices/proveedoresSlice";
import { getSedesQuery } from "@/redux/slices/sedesSlice";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

import Multiselect from 'multiselect-react-dropdown';




const ProveedorModal = () => {
  const dispatch = useDispatch();
  const show = useSelector(getShowModal);
  const formAction = useSelector(getFormAction);
  const statusModal = useSelector(getStatusModal);
  const proveedorFields = useSelector(getProveedorFields);
  // const image = useSelector(getProductImage);
  const sedes = useSelector((state) =>
    getSedesQuery(state, "")
  );
  const [filteredSedes, setFilteredSedes] = useState([]);

  const validationSchema = Yup.object().shape({
    nombre_proveedor: Yup.string().required("El campo nombre y apellido es obligatorio"),
    ciudad: Yup.string().required("El campo ciudad es obligatorio"),
    correo: Yup.string().email("Correo inválido").required("El campo del correo es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener más de 6 caracteres")
      .when([], {
        is: () => formAction === "add",
        then: (schema) => schema.required("La contraseña es obligatoria"),
        otherwise: (schema) => schema.notRequired(),
      }),
    nombre_sede: Yup.array().min(1, "El campo sede es obligatorio").required("El campo sede es obligatorio"),
  });
  const initialValue =
    formAction === "update"
      ? proveedorFields
      : {
        nombre_proveedor: "",
        ciudad: "",
        nombre_sede: "",
        correo: "",
        ciudad_sede: "",
        centro_comercial: "",
        fecha: Date.now(),
        novedades_activo: true,
        user_id: "",
      };


  const loadSedes = () => {

    // Asegurarse de que cada sede tenga los campos id y nombre_sede_direccion
    const filtered = sedes.map(sede => ({
      ...sede,
      nombre_sede_direccion: `${sede.nombre_sede} - ${sede.direccion_local}`
    }));
    setFilteredSedes(filtered)

  }
  useEffect(() => {
    loadSedes()
    console.log('modal pro',show)
  }, [show]);
  const closed = () => {
    dispatch(setShowModal(false));
  };
 
  

  const handleOpen = () => dispatch(setShowModal(!show))

  return (
    <>
      <Menu>
        <MenuHandler className="px-2 py-1 m-0">
                 <Button color="white" className="p-1 m-0"><EllipsisVerticalIcon className="h-5 w-5" /></Button>
               </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => {
            dispatch(setShowModal(true));
            dispatch(setFormAction("add"));
          }}>Crear Proveedor</MenuItem>
          <MenuItem onClick={() => {
            dispatch(fetchGetProveedorAsync());
          }}>Actualizar</MenuItem>
        </MenuList>

      </Menu>

      <Dialog
        size="xs"
        open={show}
        handler={handleOpen}
      >
        <DialogHeader>
          <div>
            {formAction === "update" ? "Actualizar" : "Crear nuevo"} proveedor
          </div>
        </DialogHeader>
        <DialogBody>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              console.log(values)
              await dispatch(
                fetchAddProveedorAsync({
                  ...values
                })
              );
              await dispatch(fetchGetProveedorAsync());
            }}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              submitCount,
            }) => (
              <form className="grid grid-cols-2" onSubmit={handleSubmit}>
                <div className=" col-span-2 mb-4">
                  {/* Nombre */}
                  <div className="input-group mb-2">
                    {/* <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span> */}

                    <label htmlFor="">Nombre Proveedor</label>
                    <Input
                      type="text"
                      className={`form-control w-full ${values.nombre_proveedor && errors.nombre_proveedor
                        ? "is-invalid"
                        : "is-valid"
                        }`}
                      id="val-nombre_proveedor"
                      name="nombre_proveedor"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nombre_proveedor}
                      autoComplete="off"
                    />
                    <div
                      className="invalid-feedback animated fadeInUp text-red-500 text-xs"
                      style={{ display: "block" }}
                    >
                      {errors.nombre_proveedor && submitCount > 0 && errors.nombre_proveedor}
                    </div>
                  </div>
                  {/* Ciudad */}
                  <div className="input-group mb-2">
                    {/* <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span> */}

                    <label htmlFor="">Ciudad</label>
                    <Input
                      type="text"
                      className={`form-control w-full text-base ${values.ciudad && errors.ciudad
                        ? "is-invalid"
                        : "is-valid"
                        }`}
                      id="val-ciudad"
                      name="ciudad"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ciudad}
                      autoComplete="off"
                    />
                    <div
                      className="invalid-feedback animated fadeInUp text-red-500 text-xs"
                      style={{ display: "block" }}
                    >
                      {errors.ciudad && submitCount > 0 && errors.ciudad}
                    </div>
                  </div>
                  {/* Correo */}
                  <div className="input-group mb-2">
                    {/* <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span> */}

                    <label htmlFor="">Correo</label>
                    <Input
                      type="text"
                      className={`   w-full ${values.correo && errors.correo
                        ? "is-invalid"
                        : "is-valid"
                        }`}
                      id="val-correo"
                      name="correo"
                      placeholder="Ejemplo@gmail.com"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.correo}
                      autoComplete="off"
                    />
                    <div
                      className="invalid-feedback animated fadeInUp text-red-500 text-xs"
                      style={{ display: "block" }}
                    >
                      {errors.correo && submitCount > 0 && errors.correo}
                    </div>
                  </div>
                  {/* Contraseña */}
                  {formAction == "add" && <div className="input-group mb-2">
                    {/* <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span> */}

                    <label htmlFor="">Contraseña</label>
                    <Input
                      type="password"
                      className={`   w-full ${values.password && errors.password
                        ? "is-invalid"
                        : "is-valid"
                        }`}
                      id="val-password"
                      name="password"
                      placeholder="***********"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      autoComplete="off"
                    />
                    <div
                      className="invalid-feedback animated fadeInUp text-red-500 text-xs"
                      style={{ display: "block" }}
                    >
                      {errors.password && submitCount > 0 && errors.password}
                    </div>
                  </div>}
                  {/* Correo */}
                  <div className="input-group mb-2">
                    {/* <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span> */}
                    <label htmlFor="">Sedes</label>
                    <Multiselect
                      options={filteredSedes}
                      displayValue="nombre_sede_direccion"

                      selectedValues={values.nombre_sede}
                      idField='id'
                      onSelect={(selectedList) => setFieldValue("nombre_sede", selectedList)}
                      onRemove={(selectedList) => setFieldValue("nombre_sede", selectedList)}
                      placeholder="Seleccione las sedes"
                      className="border p-2 rounded"
                    />
                    <div
                      className="invalid-feedback animated fadeInUp text-red-500 text-xs"
                      style={{ display: "block" }}
                    >
                      {errors.nombre_sede && submitCount > 0 && errors.nombre_sede}
                    </div>
                  </div>
                </div>



                <div className="col-span-2 flex gap-2">
                 

                  <Button
                    className="w-1/2"  color="red"
                    type="button"
                    onClick={() => dispatch(setShowModal(false))}
                  >
                    Cancelar
                  </Button>
                  <Button
                  className="w-1/2" type="submit" color="indigo" disabled={isSubmitting}
                  >
                    {formAction === "update" ? "Actualizar" : "Guardar"}
                    {statusModal === "loading" && (
                      <>
                        <i className="fa fa-cog fa-spin fa-fw" />
                        <span className="sr-only">Loading...</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </DialogBody>
      </Dialog>
    </>
  );
};
export default ProveedorModal;
