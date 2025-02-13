import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button, Dialog, DialogBody, DialogHeader, Input, Menu, MenuHandler, MenuItem, MenuList, Option, Select, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddSedeAsync, fetchGetSedesAsync, getFormAction, getShowModal, getStatusModal, setShowModal, getSedeFields, setFormAction } from "@/redux/slices/sedesSlice";
import { getSedesQuery } from "@/redux/slices/sedesSlice";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Multiselect from 'multiselect-react-dropdown';
import { calcularDV } from "@/hooks/calcularDv";
import { showError } from "@/utils/serviceMessages";
import { getEmpresasQuery } from "@/redux/slices/empresasSlice";

const SedeModal = () => {
  const dispatch = useDispatch();
  const show = useSelector(getShowModal);
  const formAction = useSelector(getFormAction);
  const statusModal = useSelector(getStatusModal);
  const sedeFields = useSelector(getSedeFields);
  const empresas = useSelector((state) => getEmpresasQuery(state, ""));
  const [filteredSedes, setFilteredSedes] = useState([]);

  const validationSchema = Yup.object().shape({
    nombre_sede: Yup.string().required("El campo nombre de la sede es obligatorio"),
    nit: Yup.string().required("El campo codigo es obligatorio"),
    dv: Yup.string().required("DV "),
    ciudad: Yup.string().required("El campo ciudad es obligatorio"),
    direccion_local: Yup.string().required("El campo dirección local es obligatorio"),
    celular: Yup.string().required("El campo celular es obligatorio"),
    centro_comercial: Yup.string().required("El campo centro comercial es obligatorio"),
    empresa_id: Yup.string().required("El nombre de la empresa es obligatorio"),
    // nombre_sede: Yup.string().email("Correo inválido").required("El campo correo es obligatorio"),
    // nombre_sede: Yup.string().required("El campo contacto es obligatorio"),
  });

  const initialValue =
    formAction === "update"
      ? sedeFields
      : {
        nombre_sede: "",
        nit: "",
        dv: 0,
        ciudad: "",
        centro_comercial: "",
        celular: "",
        equipos: [],
        direccion_local: "",
        nombre_empresa: "",
        empresa_id: "",
      };


  const onEmpresaSelect = (id) => {

    //@ts-ignore
    const empresa = empresas.filter(emp => emp.id == id);
    return empresa[0].nombre_empresa;
  }

  const handleOpen = () => dispatch(setShowModal(!show));


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
          }}>Crear sede</MenuItem>
          <MenuItem onClick={() => {
            dispatch(fetchGetSedesAsync(true));
          }}>Actualizar</MenuItem>
        </MenuList>
      </Menu>

      <Dialog size="xs" open={show} handler={handleOpen}>
        <DialogHeader>
          <div>{formAction === "update" ? "Actualizar" : "Crear nueva"} sede</div>
        </DialogHeader>
        <DialogBody>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              console.log(values)
              dispatch(fetchAddSedeAsync({ ...values })).then(() => {

                dispatch(fetchGetSedesAsync());
              }).catch((err) => {
                showError('Error al crear la sede')
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
                  {/* Nombre sede */}
                  <div className="input-group mb-2">
                    <label htmlFor="">Nombre sede</label>
                    <Input
                      type="text"
                      className={`form-control w-full ${values.nombre_sede && errors.nombre_sede ? "is-invalid" : "is-valid"}`}
                      name="nombre_sede"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nombre_sede}
                    />
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.nombre_sede && submitCount > 0 && errors.nombre_sede}
                    </div>
                  </div>



                  {/* Codigo */}
                  <div className="input-group mb-2">
                    <label htmlFor="">Código</label>
                    <Input
                      type="text"
                      className={`form-control w-full ${values.nit && errors.nit ? "is-invalid" : "is-valid"}`}
                      name="nit"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nit}
                    />
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.nit && submitCount > 0 && errors.nit}
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
                    <label htmlFor="">Dirección local</label>
                    <Input
                      type="text"
                      className={`form-control w-full ${values.direccion_local && errors.direccion_local ? "is-invalid" : "is-valid"}`}
                      name="direccion_local"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.direccion_local}
                    />
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.direccion_local && submitCount > 0 && errors.direccion_local}
                    </div>
                  </div>
                  {/* Centro comercial */}
                  <div className="input-group mb-2">
                    <label htmlFor="">Centro comercial</label>
                    <Input
                      type="text"
                      className={`form-control w-full ${values.centro_comercial && errors.centro_comercial ? "is-invalid" : "is-valid"}`}
                      name="centro_comercial"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.centro_comercial}
                    />
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.centro_comercial && submitCount > 0 && errors.centro_comercial}
                    </div>
                  </div>
                  {/* Teléfono */}
                  <div className="input-group mb-2">
                    <label htmlFor="">Celular</label>
                    <Input
                      type="text"
                      className={`form-control w-full ${values.celular && errors.celular ? "is-invalid" : "is-valid"}`}
                      name="celular"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.celular}
                    />
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.celular && submitCount > 0 && errors.celular}
                    </div>
                  </div>



                  {/* Contacto */}
                  <div className="input-group mb-2">
                    <label htmlFor="">Empresa</label>
                    <Select
                      name="empresa_id"
                      value={values.empresa_id}
                      onChange={(value) => {
                        setFieldValue("empresa_id", value);
                        const empresaSeleccionada = empresas.find(emp => emp.id == value);
                        if (empresaSeleccionada) {
                          setFieldValue("nombre_empresa", empresaSeleccionada.nombre_empresa);
                        }
                      }}
                      onBlur={handleBlur}
                    >
                      {empresas.map((empresa, i) => (
                        <Option key={i} value={empresa.id}>
                          {empresa.nombre_empresa}
                        </Option>
                      ))}
                    </Select>
                    <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                      {errors.empresa_id && submitCount > 0 && errors.empresa_id}
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

                <div className="col-span-2 flex gap-2 justify-center">
                <Button
                    className="w-1/2" color="red"
                      type="button"
                    onClick={() => dispatch(setShowModal(false))}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/2" color="indigo"
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

                

                </div>
                <div className="col-span-2 flex justify-center">
                  <Typography color="red">{ statusModal == 'fail' && 'Error al crear la sede, verifique el el código no este en uso'}</Typography>
                </div>
              </form>
            )}
          </Formik>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SedeModal;
