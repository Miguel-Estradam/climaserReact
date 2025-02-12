import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@material-tailwind/react";
import { useSelector } from "react-redux";
const initialValues = {
    nombre_sede: "",
    tipoEjecucion: "",
    datos_cliente: {
        id: 1,
        nombre_sede: "",
        nit: "",
        ciudad: "",
        equipos: [
            {
                modelo: "",
                serie: "",
                tipo: "",
                capacidad: "",
                tipo_refrigerante: "",
                sede_id: 16,
                id: 1,
            },
        ],
        centro_comercial: "",
        direccion_local: "",
        nombre_empresa: "",
    },
    equipos: [],
    estado_sistema: {
        condensador: {
            rotacion_abanico: "",
            RPM_abanico: "",
            rodamientos_abanico: "",
            rodamientos_motor: "",
            amperaje_motor: "",
            temperatura_motor: "",
            temperatura_ambiente_exterior: "",
            area_libre_retorno: "",
            alambrado_general: "",
        },
        evaporador: {
            PCM: "",
            rotacion_turbina: "",
            RPM_turbina: "",
            rodaminetos_turbina: "",
            rodamientos_motor: "",
            amperaje_motor: "",
            temperatura_motor: "",
            filtros: "",
            drene_condensados: "",
        },
        lineas_refigeracion: {
            aislamiento_termico: "",
            soporteria: "",
        },
        detalles_servicio: "",
        servicio_cliente: {
            satisfecho: "",
            porque: "",
        },
    },
};
const validationSchema = Yup.object({
    nombre_sede: Yup.string().required("Campo requerido"),
    tipoEjecucion: Yup.string().required("Campo requerido"),
    datos_cliente: Yup.object({
        nombre_sede: Yup.string().required("Campo requerido"),
        nit: Yup.string().required("Campo requerido"),
        ciudad: Yup.string().required("Campo requerido"),
        centro_comercial: Yup.string(),
        direccion_local: Yup.string(),
        nombre_empresa: Yup.string().required("Campo requerido"),
    }),
});
const ReporteModal = () => {
    const [currentStep, setCurrentStep] = useState(0);
     const sedes = useSelector((state) => state.sede.sedes);
 
    console.log(sedes)
    const steps = [
        "Datos de la Sede",
        "Datos del Cliente",
        "Equipos",
        "Estado del Sistema",
    ];
    return (
        <div className='absolute flex justify-center p-8 top-0 left-0 w-full h-full bg-secondary min-h-screen z-50'>
            <div className='container card h-full w-full max-[800px] bg-white rounded-xl shadow-sm p-4'>
                <div>
                    <h6
                        class="text-principal w-full text-center text-3xl lg:text-4xl font-bold uppercase"
                    >
                        Nuevo reporte
                    </h6></div> <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log("Reporte Final:", values);
                        }}
                    >
                        {({ values, setFieldValue,handleChange,handleBlur,submitCount,errors }) => (
                            <Form className="p-4">
                                <h2 className="text-xl font-bold mb-4">{steps[currentStep]}</h2>

                                {/* Sección 1: Datos de la Sede */}
                                {currentStep === 0 && (
                                    <div className="grid grid-cols-12 gap-2">
                                        Nombre sede
                                        <div className="col-span-12 md:col-span-6 lg:col-span-4 input-group mb-2">
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

                                        <div>
                                            <label>Tipo de Ejecución</label>
                                            <Field name="tipoEjecucion" className="border p-2 w-full" />
                                            <ErrorMessage name="tipoEjecucion" component="div" className="text-red-500" />

                                        </div>
                                    </div>
                                )}

                                {/* Sección 2: Datos del Cliente */}
                                {currentStep === 1 && (
                                    <div>
                                        <label>Nombre del Cliente</label>
                                        <Field name="datos_cliente.nombre_sede" className="border p-2 w-full" />
                                        <ErrorMessage name="datos_cliente.nombre_sede" component="div" className="text-red-500" />

                                        <label>NIT</label>
                                        <Field name="datos_cliente.nit" className="border p-2 w-full" />
                                        <ErrorMessage name="datos_cliente.nit" component="div" className="text-red-500" />

                                        <label>Ciudad</label>
                                        <Field name="datos_cliente.ciudad" className="border p-2 w-full" />
                                        <ErrorMessage name="datos_cliente.ciudad" component="div" className="text-red-500" />
                                    </div>
                                )}

                                {/* Sección 3: Equipos */}
                                {currentStep === 2 && (
                                    <div>
                                        <label>Modelo del Equipo</label>
                                        <Field name="datos_cliente.equipos[0].modelo" className="border p-2 w-full" />
                                        <ErrorMessage name="datos_cliente.equipos[0].modelo" component="div" className="text-red-500" />

                                        <label>Serie</label>
                                        <Field name="datos_cliente.equipos[0].serie" className="border p-2 w-full" />
                                        <ErrorMessage name="datos_cliente.equipos[0].serie" component="div" className="text-red-500" />
                                    </div>
                                )}

                                {/* Sección 4: Estado del Sistema */}
                                {currentStep === 3 && (
                                    <div>
                                        <label>Rotación Abanico</label>
                                        <Field name="estado_sistema.condensador.rotacion_abanico" className="border p-2 w-full" />
                                        <ErrorMessage name="estado_sistema.condensador.rotacion_abanico" component="div" className="text-red-500" />

                                        <label>Amperaje Motor</label>
                                        <Field name="estado_sistema.condensador.amperaje_motor" className="border p-2 w-full" />
                                        <ErrorMessage name="estado_sistema.condensador.amperaje_motor" component="div" className="text-red-500" />
                                    </div>
                                )}

                                {/* Navegación */}
                                <div className="mt-4 flex justify-between">
                                    {currentStep > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(currentStep - 1)}
                                            className="bg-gray-300 px-4 py-2"
                                        >
                                            Anterior
                                        </button>
                                    )}

                                    {currentStep < steps.length - 1 ? (
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(currentStep + 1)}
                                            className="bg-blue-500 text-white px-4 py-2"
                                        >
                                            Siguiente
                                        </button>
                                    ) : (
                                        <button type="submit" className="bg-green-500 text-white px-4 py-2">
                                            Enviar
                                        </button>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik></div>  </div>
        </div>
    )
}

export default ReporteModal
