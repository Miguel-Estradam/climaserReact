import { useAppDispatch, useSelector } from "app/hooks";

// import ProductCard from "components/ProductCard";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
// import {
//   fetchAddProductAsync,
//   fetchGetProductsAsync,
//   getProductFields,
//   getFormAction,
//   getShowModal,
//   setFormAction,
//   setShowModal,
//   getStatusModal,
//   getProductImage,
// } from "../../redux/productSlice";
import * as Yup from "yup";

import { FileInput, Label } from "flowbite-react";
import ProductCard from "./ProductCard";
import { IAddProduct } from "utils/models/IProducts";
import { getSubCategorysQuery } from "modules/dashboard/redux/subCategorySlice";
import { Dialog, Menu } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProveedorAsync, setShowModal,getFormAction,getShowModal,getStatusModal,getProveedorFields} from "@/redux/slices/proveedoresSlice";

const ProductSchema = Yup.object().shape({
  nombreDescriptivo: Yup.string()
    .required("Nombre requerido")
    .max(50, "El máximo de caracteres permitidos es 50"),
  categoria: Yup.string().required("categoría requerida"),
  imagen: Yup.string().required("Imagen requerida").nullable(),
  codigo: Yup.string().required("El código es requerido"),
  precio: Yup.string().notRequired(),
  subCategoria: Yup.string().notRequired(),
  descripcion: Yup.string()
    .notRequired()
    .max(150, "El máximo de caracteres permitidos es 150"),
});

const ProveedorModal = () => {
  const dispatch = useDispatch();
  const show = useSelector(getShowModal);
  const formAction = useSelector(getFormAction);
  const statusModal = useSelector(getStatusModal);
  const ProductFields = useSelector(getProveedorFields);
  const image = useSelector(getProductImage);
  const [searchCategory, setSearchCategory] = useState("");
  const sedes = useSelector((state) =>
    getSubCategorysQuery(state, searchCategory)
  );
  const [imgData, setImgData] = useState("");
  const [imgData2, setImgData2] = useState("");
  const [uidSubCategory, setUidSubCategory] = useState("");

  const initialValue =
    formAction === "update"
      ? ProductFields
      : {
        nombre_proveedor: "",
        ciudad: "",
        nombre_sede: "",
        ciudad_sede: "",
        centro_comercial: "",
        fecha: "",
        correo: "",
        novedades_activo: "",
      };



  useEffect(() => {
    if (formAction === "update") {
      setImgData(image);
    } else {
      setImgData("");
    }
  }, [show]);
  const closed = () => {
    dispatch(setShowModal(true));
  };
  const onChangeSubCategory = (subCategory) => {
    // setUidSubCategory(s)
    const objetoEncontrado = subCategorys.find(
      (item) => item.name === subCategory
    );
    if (objetoEncontrado) {
      setUidSubCategory(objetoEncontrado.id);
    } else {
    }
  };
  const onChangeCategory = (subCategory) => {
    // setUidSubCategory(s)
    setSearchCategory(subCategory);
  };
   const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Menu>
        <MenuHandler>
          <Button>Menu</Button>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => {
            dispatch(setShowModal(true));
            dispatch(setFormAction("add"));
          }}>Crear Proveedor</MenuItem>
          <MenuItem onClick={() => {
            dispatch(fetchGetProveedorAsync(true));
          }}>Actualizar</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>
       
      </Menu>

      <Dialog
        
        size="xs"
        open={statusModal}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        dismissible
        show={show}
        onClose={() => dispatch(setShowModal(false))}
      >
        <Modal.Header>
          <div>
            {formAction === "update" ? "Actualizar" : "Crear nuevo"} producto
          </div>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValue}
            validationSchema={ProductSchema}
            onSubmit={async (values) => {
              await dispatch(
                fetchAddProductAsync({
                  ...values,
                  imagen: imgData,
                  imagenField: imgData2,
                  uidSubCategory: uidSubCategory,
                })
              );
              await dispatch(fetchGetProductsAsync(true));
            }}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="grid grid-cols-2" onSubmit={handleSubmit}>
                <div className=" col-span-2 mb-4">
                  <label htmlFor="val-name" className="text-label">
                    Nombre descriptivo <span className="text-red-500">*</span>
                  </label>
                  <div className="input-group transparent-append mb-2">
                    {/* <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span> */}
                    <input
                      type="text"
                      className={`form-control w-full ${values.nombreDescriptivo && errors.nombreDescriptivo
                          ? "is-invalid"
                          : "is-valid"
                        }`}
                      id="val-name"
                      name="nombreDescriptivo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nombreDescriptivo}
                      autoComplete="off"
                    />
                    <div
                      className="invalid-feedback animated fadeInUp text-red-500"
                      style={{ display: "block" }}
                    >
                      {errors.nombreDescriptivo && errors.nombreDescriptivo}
                    </div>
                  </div>
                </div>
                <div className=" col-span-1 mb-4 pr-1">
                  <label htmlFor="val-name" className="text-label">
                    Categoría <span className="text-red-500">*</span>
                  </label>
                  <div className=" input-group transparent-append mb-2">
                    {/* <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span> */}
                    <select
                      className={`form-control w-full ${values.categoria && errors.categoria
                          ? "is-invalid"
                          : "is-valid"
                        }`}
                      id="val-names"
                      name="categoria"
                      onChange={(e) => {
                        handleChange(e);

                        onChangeCategory(e.target.value);
                      }}
                      onBlur={handleBlur}
                      value={values.categoria}
                      autoComplete="off"
                      style={{ display: "block" }}
                    >
                      <option value="" label="Selecciona una categoria">
                        Selecciona una categoria
                      </option>
                      <option value="muebles" label="Muebles">
                        {" "}
                        muebles
                      </option>
                      <option value="tecnologia" label="Tecnología">
                        Tecnología
                      </option>

                      <option
                        value="electrodomesticos"
                        label="Electrodomésticos"
                      >
                        Electrodomésticos
                      </option>
                      <option value="deportes" label="Deportes">
                        Deportes
                      </option>
                    </select>
                    <div
                      className="invalid-feedback text-red-500 animated fadeInUp"
                      style={{ display: "block" }}
                    >
                      {errors.categoria && errors.categoria}
                    </div>
                  </div>
                </div>
                <div className=" col-span-1 mb-4 pr-1">
                  <label htmlFor="val-name" className="text-label">
                    Subcategoría
                  </label>
                  <div className=" input-group transparent-append mb-2">
                    {/* <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span> */}
                    <select
                      className={`form-control w-full ${values.subCategoria && errors.subCategoria
                          ? "is-invalid"
                          : "is-valid"
                        }`}
                      id="val-subcategoria"
                      name="subCategoria"
                      onChange={(e) => {
                        handleChange(e);

                        onChangeSubCategory(e.target.value);
                      }}
                      onBlur={handleBlur}
                      value={values.subCategoria}
                      autoComplete="off"
                      style={{ display: "block" }}
                    >
                      <option value="" label="Selecciona una categoria">
                        Selecciona una subcategoría
                      </option>
                      {subCategorys.map((c) => (
                        <option key={c.id} value={c.name} label={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <div
                      className="invalid-feedback text-red-500 animated fadeInUp"
                      style={{ display: "block" }}
                    >
                      {errors.subCategoria && errors.subCategoria}
                    </div>
                  </div>
                </div>

                <div className=" col-span-1 mb-4 pr-1">
                  <label htmlFor="val-name" className="text-label">
                    Precio
                  </label>
                  <div className="input-group transparent-append mb-2">
                    {/* <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span> */}
                    <input
                      type="text"
                      className={`form-control w-full ${values.precio && errors.precio ? "is-valid" : "is-valid"
                        }`}
                      id="val-precio"
                      name="precio"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.precio}
                      autoComplete="off"
                    />
                    <div
                      className="invalid-feedback animated fadeInUp text-red-500"
                      style={{ display: "block" }}
                    >
                      {errors.precio && errors.precio}
                    </div>
                  </div>
                </div>
                <div className=" col-span-1 mb-4">
                  <label htmlFor="val-name" className="text-label">
                    Código <span className="text-red-500">*</span>
                  </label>
                  <div className="input-group transparent-append mb-2">
                    {/* <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span> */}
                    <input
                      type="text"
                      className={`form-control w-full ${values.codigo && errors.codigo
                          ? "is-invalid"
                          : "is-valid"
                        }`}
                      id="val-codigo"
                      name="codigo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.codigo}
                      autoComplete="off"
                    />
                    <div
                      className="invalid-feedback animated fadeInUp text-red-500"
                      style={{ display: "block" }}
                    >
                      {errors.codigo && errors.codigo}
                    </div>
                  </div>
                </div>
                <div className=" col-span-2 mb-4">
                  <label htmlFor="val-name" className="text-label">
                    Descripción <span className="text-red-500">*</span>
                  </label>
                  <div className="input-group transparent-append mb-2">
                    {/* <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span> */}
                    <textarea
                      className={`form-control w-full `}
                      id="val-descipcion"
                      name="descripcion"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.descripcion}
                    />
                    <div
                      className="invalid-feedback animated fadeInUp text-red-500"
                      style={{ display: "block" }}
                    >
                      {errors.descripcion && errors.descripcion}
                    </div>
                  </div>
                </div>
                {/* Otros campos similares */}
                <div className=" col-span-2 mb-4">
                  <label htmlFor="val-image" className="text-label">
                    Subir imagen
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-upload"></i>
                    </span>
                    <div className="form-file">
                      <input type="hidden" value={values.imagen} />
                      <input
                        type="file"
                        id="val-imagen"
                        name="imagen"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.value) {
                            handleChange(e);
                            onChangePicture(e);
                          }
                        }}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div
                      className="invalid-feedback animated fadeInUp text-red-500"
                      style={{ display: "block" }}
                    >
                      {errors.imagen && errors.imagen}
                    </div>
                    <ProductCard image={imgData} />
                  </div>
                </div>

                <div className="col-span-2">
                  <button
                    type="submit"
                    className="lg:text-base bg-vinotinto hover:bg-red-800 text-white  py-1 px-6 mx-3 rounded-full"
                    disabled={isSubmitting}
                  >
                    {formAction === "update" ? "Actualizar" : "Guardar"}
                    {statusModal === "loading" && (
                      <>
                        <i className="fa fa-cog fa-spin fa-fw" />
                        <span className="sr-only">Loading...</span>
                      </>
                    )}
                  </button>

                  <button
                    className=" hover:bg-vinotinto hover:text-white px-6 py-1 hover:rounded-full mx-3"
                    type="button"
                    onClick={() => dispatch(setShowModal(false))}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Dialog>
    </>
  );
};
export default ProveedorModal;
