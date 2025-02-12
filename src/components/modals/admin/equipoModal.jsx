import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Button, Dialog, DialogBody, DialogHeader, Input, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal, getShowModal, getFormAction, setFormAction } from "@/redux/slices/equiposSlice";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

const EquipoModal = () => {
  const dispatch = useDispatch();
  const show = useSelector(getShowModal);
  const formAction = useSelector(getFormAction);
  const equipo = useSelector((state) => state.equipo.equipo);

  const validationSchema = Yup.object().shape({
    marca: Yup.string().required("El campo marca es obligatorio"),
    modelo: Yup.string().required("El campo modelo es obligatorio"),
    modelo_condensadora: Yup.string().required("El campo modelo condensadora es obligatorio"),
    serie: Yup.string().required("El campo serie es obligatorio"),
    tipo: Yup.string().required("El campo tipo es obligatorio"),
    capacidad: Yup.string().required("El campo capacidad es obligatorio"),
    tipo_refrigerante: Yup.string().required("El campo tipo de refrigerante es obligatorio"),
    observaciones: Yup.string(),
    sede_id: Yup.string().required("El campo sede es obligatorio"),
  });

  const initialValues = formAction === "update" ? equipo : {
    marca: "",
    modelo: "",
    modelo_condensadora: "",
    serie: "",
    tipo: "",
    capacidad: "",
    tipo_refrigerante: "",
    observaciones: "",
    sede_id: "",
  };

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
          }}>Crear Equipo</MenuItem>
          <MenuItem onClick={() => {
            // dispatch(fetchGetEmpresasAsync(true));
          }}>Actualizar</MenuItem>
        </MenuList>
      </Menu>
    <Dialog size="xs" open={show} handler={handleOpen}>
      <DialogHeader color="indigo">
        {formAction === "update" ? "Actualizar" : "Crear nuevo"} equipo
      </DialogHeader>
      <DialogBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            dispatch(setShowModal(false));
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit, submitCount }) => (
            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
              {Object.keys(initialValues).map((key) => (
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
              ))}
              <Button type="submit" color="indigo">Guardar</Button>
            </form>
          )}
        </Formik>
      </DialogBody>
    </Dialog></>
  );
};

export default EquipoModal;
