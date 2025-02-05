import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button, Dialog, DialogBody, DialogHeader, Input, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddEmpresaAsync, fetchGetEmpresasAsync, getFormAction, getShowModal, getStatusModal, setShowModal, getEmpresaFields, setFormAction } from "@/redux/slices/empresasSlice";
import { getSedesQuery } from "@/redux/slices/sedesSlice";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Multiselect from 'multiselect-react-dropdown';
import { calcularDV } from "@/hooks/calcularDv";
import { showError } from "@/utils/serviceMessages";

const EmpresaModal = () => {
  const dispatch = useDispatch();
  const show = useSelector(getShowModal);
  const formAction = useSelector(getFormAction);
  const statusModal = useSelector(getStatusModal);
  const empresaFields = useSelector(getEmpresaFields);
  const sedes = useSelector((state) => getSedesQuery(state, ""));
  const [filteredSedes, setFilteredSedes] = useState([]);

  const validationSchema = Yup.object().shape({
    nombre_empresa: Yup.string().required("El campo nombre de la empresa es obligatorio"),
    nit: Yup.string().required("El campo NIT es obligatorio"),
    dv: Yup.string().required("DV "),
    ciudad: Yup.string().required("El campo ciudad es obligatorio"),
    direccion: Yup.string().required("El campo dirección es obligatorio"),
    telefono: Yup.string().required("El campo teléfono es obligatorio"),
    correo: Yup.string().email("Correo inválido").required("El campo correo es obligatorio"),
    contacto: Yup.string().required("El campo contacto es obligatorio"),
    // tiendas_vinculadas: Yup.array().min(0, "Debe seleccionar al menos una tienda")
  });

  const initialValue =
    formAction === "update"
      ? empresaFields
      : {
        nombre_empresa: "",
        nit: "",
        dv: "",
        ciudad: "",
        direccion: "",
        telefono: "",
        correo: "",
        contacto: "",
        tiendas_vinculadas:[],
        created_at: Date.now(),
      };

  const loadSedes = () => {
    const filtered = sedes.map(sede => ({
      ...sede,
      nombre_sede_direccion: `${sede.nombre_sede} - ${sede.direccion_local}`,
    }));
    setFilteredSedes(filtered);
  };

  useEffect(() => {
    loadSedes();
  }, [statusModal]);

  const handleOpen = () => dispatch(setShowModal(!show));
 
  
  return (
    <>
      <Menu>
        <MenuHandler className="px-2 py-1 m-0">
          <Button color="indigo" className="p-1 m-0"><EllipsisVerticalIcon className="h-5 w-5" /></Button>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => {
            dispatch(setShowModal(true));
            dispatch(setFormAction("add"));
          }}>Crear Empresa</MenuItem>
          <MenuItem onClick={() => {
            dispatch(fetchGetEmpresasAsync(true));
          }}>Actualizar</MenuItem>
        </MenuList>
      </Menu>

      <Dialog size="xs" open={show} handler={handleOpen}>
        <DialogHeader>
          <div>{formAction === "update" ? "Actualizar" : "Crear nueva"} empresa</div>
        </DialogHeader>
        <DialogBody>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              console.log(values)
              dispatch(fetchAddEmpresaAsync({ ...values })).then(()=>{

                dispatch(fetchGetEmpresasAsync());
              }).catch((err) => {
                showError('Error al crear la empresa')
              });
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
                <div className="col-span-2 mb-4">
                  {/* Nombre Empresa */}
                  <div className="input-group mb-2">
                    <label htmlFor="">Nombre Empresa</label>
                    <Input
                      type="text"
                      className={`form-control w-full ${values.nombre_empresa && errors.nombre_empresa ? "is-invalid" : "is-valid"}`}
                      name="nombre_empresa"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nombre_empresa}
                    />
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.nombre_empresa && submitCount > 0 && errors.nombre_empresa}
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-2">


                    {/* NIT */}
                    <div className="col-span-9 lg:col-span-10 input-group mb-2">
                      <label htmlFor="">NIT</label>
                      <Input
                        type="text"
                        className={`form-control w-full ${values.nit && errors.nit ? "is-invalid" : "is-valid"}`}
                        name="nit"
                        onChange={(e) => {
                          handleChange(e);
                          const nit = e.target.value;
                          if (nit.length >= 8) {
                            const dvCalculado = calcularDV(nit);
                            setFieldValue("dv", dvCalculado);  // Actualizamos el DV automáticamente
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.nit}
                      />
                      <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                        {errors.nit && submitCount > 0 && errors.nit}
                      </div>
                    </div>
                    {/* DV */}
                    <div className=" col-span-2 w-16 mb-2">
                      <label htmlFor="">DV</label>
                      <Input
                        type="number"
                        disabled
                        className={`form-control border border-black w-16 ${values.dv && errors.dv ? "is-invalid" : "is-valid"}`}
                        name="dv"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dv}
                      />
                      <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                        {errors.dv && submitCount > 0 && errors.dv}
                      </div>
                    </div>
                  </div>


                  {/* Ciudad */}
                  <div className="input-group mb-2">
                    <label htmlFor="">Ciudad</label>
                    <Input
                      type="text"
                      className={`form-control w-full ${values.ciudad && errors.ciudad ? "is-invalid" : "is-valid"}`}
                      name="ciudad"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ciudad}
                    />
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.ciudad && submitCount > 0 && errors.ciudad}
                    </div>
                  </div>

                  {/* Dirección */}
                  <div className="input-group mb-2">
                    <label htmlFor="">Dirección</label>
                    <Input
                      type="text"
                      className={`form-control w-full ${values.direccion && errors.direccion ? "is-invalid" : "is-valid"}`}
                      name="direccion"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.direccion}
                    />
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.direccion && submitCount > 0 && errors.direccion}
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="input-group mb-2">
                    <label htmlFor="">Teléfono</label>
                    <Input
                      type="text"
                      className={`form-control w-full ${values.telefono && errors.telefono ? "is-invalid" : "is-valid"}`}
                      name="telefono"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.telefono}
                    />
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.telefono && submitCount > 0 && errors.telefono}
                    </div>
                  </div>

                  {/* Correo */}
                  <div className="input-group mb-2">
                    <label htmlFor="">Correo</label>
                    <Input
                      type="text"
                      className={`form-control w-full ${values.correo && errors.correo ? "is-invalid" : "is-valid"}`}
                      name="correo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.correo}
                    />
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.correo && submitCount > 0 && errors.correo}
                    </div>
                  </div>

                  {/* Contacto */}
                  <div className="input-group mb-2">
                    <label htmlFor="">Contacto</label>
                    <Input
                      type="text"
                      className={`form-control w-full ${values.contacto && errors.contacto ? "is-invalid" : "is-valid"}`}
                      name="contacto"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.contacto}
                    />
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.contacto && submitCount > 0 && errors.contacto}
                    </div>
                  </div>

                  {/* Tiendas Vinculadas */}
                  {/* <div className="input-group mb-2">
                    <label htmlFor="">Tiendas Vinculadas</label>
                    <Multiselect
                      options={filteredSedes}
                      displayValue="nombre_sede_direccion"
                      selectedValues={values.tiendas_vinculadas}
                      idField="id"
                      onSelect={(selectedList) => setFieldValue("tiendas_vinculadas", selectedList)}
                      onRemove={(selectedList) => setFieldValue("tiendas_vinculadas", selectedList)}
                      placeholder="Seleccione las tiendas"
                      className="border p-2 rounded"
                    />
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.tiendas_vinculadas && submitCount > 0 && errors.tiendas_vinculadas}
                    </div>
                  </div> */}
                </div>

                <div className="col-span-2">
                  <Button
                    type="submit"
                    className="lg:text-base bg-secondary hover:bg-blue-800 text-white py-1 px-6 mx-3 hover:rounded-full"
                    disabled={isSubmitting}
                  >
                    {formAction === "update" ? "Actualizar" : "Guardar"}
                    {statusModal === "loading" && (
                      <>
                        <i className="fa fa-cog fa-spin fa-fw" />
                        <span className="sr-only">Loading...</span>
                      </>
                    )}
                  </Button>

                  <Button
                    className="lg:text-base hover:bg-red-600 hover:text-white px-6 py-1 hover:rounded-full mx-3"
                    type="button"
                    onClick={() => dispatch(setShowModal(false))}
                  >
                    Cancelar
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

export default EmpresaModal;
