import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Button, Dialog, DialogBody, DialogHeader, Input, Menu, MenuHandler, MenuItem, MenuList, Textarea } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal, getShowModal, getFormAction, setFormAction, getEquiposFields, getStatusModal, fetchGetEquiposAsync, fetchAddEquipoAsync } from "@/redux/slices/equiposSlice";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

const EquipoModal = () => {
  const dispatch = useDispatch();
  const show = useSelector(getShowModal);
  const formAction = useSelector(getFormAction);
  const equipoFields = useSelector(getEquiposFields);
  const sede = useSelector((state) => state.equipo.sede);

  const statusModal = useSelector(getStatusModal);

  const validationSchema = Yup.object().shape({
    marca: Yup.string().required("El campo marca es obligatorio"),
    modelo: Yup.string().required("El campo modelo es obligatorio"),
    modelo_condensadora: Yup.string().required("El campo modelo condensadora es obligatorio"),
    serie: Yup.string().required("El campo serie es obligatorio"),
    tipo: Yup.string().required("El campo tipo es obligatorio"),
    capacidad: Yup.string().required("El campo capacidad es obligatorio"),
    tipo_refrigerante: Yup.string().required("El campo tipo de refrigerante es obligatorio"),
    observaciones: Yup.string(),
    consumo_electrico: Yup.string().required("El campo consumo_electrico es obligatorio"),
    fase: Yup.string().required("El campo fase es obligatorio"),
    voltaje: Yup.string().required("El campo voltaje es obligatorio"),
    ubicacion: Yup.string().required("El campo ubicacion es obligatorio"),
    sede_id: Yup.string().required("El campo sede es obligatorio"),
  });


  const handleOpen = () => dispatch(setShowModal(!show));
  const initialValues = formAction === "update" ? equipoFields : {
    marca: "",
    modelo: "",
    modelo_condensadora: "",
    serie: "",
    tipo: "",
    capacidad: "",
    tipo_refrigerante: "",
    observaciones: "",
    consumo_electrico: "",
    fase: "",
    voltaje: "",
    ubicacion: "",
    sede_id: sede ? sede.id : '',
  };

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
          }}>Crear Equipo</MenuItem>
          <MenuItem onClick={() => {
            dispatch(fetchGetEquiposAsync());
          }}>Actualizar</MenuItem>
        </MenuList>
      </Menu>
      <Dialog size="xs" open={show} handler={handleOpen} className=" max-h-[90vh] overflow-hidden ">
        <DialogHeader color="indigo">
          {formAction === "update" ? "Actualizar" : "Crear nuevo"} equipo
        </DialogHeader>
        <DialogBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              console.log(values)
              dispatch(fetchAddEquipoAsync({ ...values })).then(() => {

                dispatch(fetchGetEquiposAsync());
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
              submitCount, }) => (
              <form className="grid grid-cols-2 gap-4 overflow-y-scroll  max-h-[80vh]  bg-red-2 00" onSubmit={handleSubmit}>

                {/* Marca equipo */}
                <div className="col-span-2 lg:col-span-1 input-group mb-2 h-auto  ">
                  <label className=" font-medium text-principal" htmlFor="">Marca</label>
                  <Input
                    type="text"
                    className={`form-control w-full ${values.marca && errors.marca ? "is-invalid" : "is-valid"}`}
                    name="marca"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.marca}
                  />
                  <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                    {errors.marca && submitCount > 0 && errors.marca}
                  </div>
                </div>
                {/* Modelo equipo */}
                <div className="col-span-2 lg:col-span-1 input-group mb-2">
                  <label className=" font-medium text-principal" htmlFor="">Modelo</label>
                  <Input
                    type="text"
                    className={`form-control w-full ${values.modelo && errors.modelo ? "is-invalid" : "is-valid"}`}
                    name="marca"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.modelo}
                  />
                  <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                    {errors.modelo && submitCount > 0 && errors.modelo}
                  </div>
                </div>
                {/* Modelo condensador equipo */}
                <div className="col-span-2 lg:col-span-1 input-group mb-2">
                  <label className=" font-medium text-principal" htmlFor="">Modelo del condensador</label>
                  <Input
                    type="text"
                    className={`form-control w-full ${values.modelo_condensadora && errors.modelo_condensadora ? "is-invalid" : "is-valid"}`}
                    name="marca"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.modelo_condensadora}
                  />
                  <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                    {errors.modelo_condensadora && submitCount > 0 && errors.modelo_condensadora}
                  </div>
                </div>
                {/* Serie equipo */}
                <div className="col-span-2 lg:col-span-1 input-group mb-2">
                  <label className=" font-medium text-principal" htmlFor="">Serie</label>
                  <Input
                    type="text"
                    className={`form-control w-full ${values.serie && errors.serie ? "is-invalid" : "is-valid"}`}
                    name="serie"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.serie}
                  />
                  <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                    {errors.serie && submitCount > 0 && errors.serie}
                  </div>
                </div>
                {/* Tipo equipo */}
                <div className="col-span-2 lg:col-span-1 input-group mb-2">
                  <label className=" font-medium text-principal" htmlFor="">Tipo de refrigerante</label>
                  <Input
                    type="text"
                    className={`form-control w-full ${values.tipo && errors.tipo ? "is-invalid" : "is-valid"}`}
                    name="tipo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tipo}
                  />
                  <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                    {errors.tipo && submitCount > 0 && errors.tipo}
                  </div>
                </div>
                {/* Consumo eléctrico (AMP)*/}
                <div className="col-span-2 lg:col-span-1 input-group mb-2">
                  <label className=" font-medium text-principal" htmlFor="">Consumo eléctrico (AMP)</label>
                  <Input
                    type="text"
                    className={`form-control w-full ${values.c && errors.consumo_electrico ? "is-invalid" : "is-valid"}`}
                    name="consumo_electrico"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.consumo_electrico}
                  />
                  <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                    {errors.consumo_electrico && submitCount > 0 && errors.consumo_electrico}
                  </div>
                </div>
                {/* Capacidad (btu/h) equipo */}
                <div className="col-span-2 lg:col-span-1 input-group mb-2">
                  <label className=" font-medium text-principal" htmlFor="">Capacidad (btu/h)</label>
                  <Input
                    type="number"
                    className={`form-control w-full ${values.capacidad && errors.capacidad ? "is-invalid" : "is-valid"}`}
                    name="capacidad"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.capacidad}
                  />
                  <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                    {errors.capacidad && submitCount > 0 && errors.capacidad}
                  </div>
                </div>
                {/* Capacidad (btu/h) equipo */}
                <div className="col-span-2 lg:col-span-1 input-group mb-2">
                  <label className=" font-medium text-principal" htmlFor="">Fase (PH)</label>
                  <Input
                    type="number"
                    className={`form-control w-full ${values.fase && errors.fase ? "is-invalid" : "is-valid"}`}
                    name="fase"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fase}
                  />
                  <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                    {errors.fase && submitCount > 0 && errors.fase}
                  </div>
                </div>
                {/* Capacidad (btu/h) equipo */}
                <div className="col-span-2 lg:col-span-1 input-group mb-2">
                  <label className=" font-medium text-principal" htmlFor="">Voltaje (UV)</label>
                  <Input
                    type="number"
                    className={`form-control w-full ${values.voltaje && errors.voltaje ? "is-invalid" : "is-valid"}`}
                    name="voltaje"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.voltaje}
                  />
                  <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                    {errors.voltaje && submitCount > 0 && errors.voltaje}
                  </div>
                </div>
                {/* Capacidad (btu/h) equipo */}
                <div className="col-span-2 lg:col-span-1 input-group mb-2">
                  <label className=" font-medium text-principal" htmlFor="">Ubicación equipo</label>
                  <Input
                    type="text"
                    className={`form-control w-full ${values.ubicacion && errors.ubicacion ? "is-invalid" : "is-valid"}`}
                    name="ubicacion"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ubicacion}
                  />
                  <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                    {errors.ubicacion && submitCount > 0 && errors.ubicacion}
                  </div>
                </div>
                {/* Capacidad (btu/h) equipo */}
                <div className="col-span-2 input-group mb-2">
                  <label className=" font-medium text-principal" htmlFor="">Observaciones</label>
                  <Textarea
                    className={`form-control w-full ${values.observaciones && errors.observaciones ? "is-invalid" : "is-valid"}`}
                    name="observaciones"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.observaciones}
                  />
                  <div className="invalid-feedback text-red-500 text-xs" style={{ display: "block" }}>
                    {errors.observaciones && submitCount > 0 && errors.observaciones}
                  </div>
                </div>
                {/* {Object.keys(initialValues).map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">{key.replace("_", " ")}</label>
                    <Input
                      type="text"
                      name={key}
                      value={values[key]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control w-full ${errors[key] ? "border-red-500" : ""}`}
                    />
                    {errors[key] && submitCount > 0 && (
                      <div className="text-red-500 text-xs">{errors[key]}</div>
                    )}
                  </div>
                ))} */}
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

              </form>
            )}
          </Formik>
        </DialogBody>
      </Dialog></>
  );
};

export default EquipoModal;
