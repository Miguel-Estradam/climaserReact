import { Card, CardBody, CardHeader, Chip, Typography } from '@material-tailwind/react';
import React, { useRef, useState } from 'react'
import Pagination from '@/share/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProveedorQuery } from '@/redux/slices/proveedoresSlice';
import { HomeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
const TableSedes = () => {

    const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const sort = 5;
    const proveedores = useSelector((state) => getProveedorQuery(state, query));
    const paggination = Array(Math.ceil(proveedores.length / sort))
        .fill(0)
        .map((_, i) => i + 1);

    const activePag = useRef(0);
    const [data, setData] = useState(
        proveedores.slice(activePag.current * sort, (activePag.current + 1) * sort)
    );
    const onChangePagination = (i) => {
        activePag.current = i;
        setData(
            products.slice(activePag.current * sort, (activePag.current + 1) * sort)
        );
    };
    return (
        <>
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        {["Nombre", "Ciudad", "Sedes", "Fecha", "Correo", "Estado", ""].map((el) => (
                            <th
                                key={el}
                                className="border-b border-blue-gray-50 py-3 px-5 text-left"
                            >
                                <Typography
                                    variant="small"
                                    className="text-lg font-bold uppercase text-blue-gray-400"
                                >
                                    {el}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map(
                        ({ nombre_proveedor, ciudad, nombre_sede, fecha, correo, ciudad_sede, centro_comercial, novedades_activo, date }, key) => {
                            const className = `py-3 px-5 ${key === proveedores.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;

                            return (
                                <tr key={nombre_proveedor}>
                                    <td className={className}>
                                        <Typography className="text-base font-semibold text-blue-gray-600">
                                            {nombre_proveedor}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-semibold text-blue-gray-600">
                                            {ciudad}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-semibold text-blue-gray-600">
                                            {nombre_sede.length}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-semibold text-blue-gray-600">
                                            {fecha}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-semibold text-blue-gray-600">
                                            {correo}
                                        </Typography>
                                    </td>
                                    <td className={className }>
                                        <Chip
                                            variant="gradient"
                                            color={novedades_activo ? "green" : "blue-gray"}
                                            value={novedades_activo ? "Activo" : "desactivado"}
                                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                        />
                                    </td>
                                    <td className={className }>
                                        <Typography
                                            as="a"
                                            href="#"
                                            className="text-base flex gap-2 font-semibold text-blue-gray-600"
                                        >
                                            <PencilIcon className='h-5 w-5'/>
                                            <TrashIcon className='w-5 h-5'/>
                                        </Typography>
                                      
                                    </td>
                                   
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
            <div>
                <Pagination
                    size="xs"
                    gutter
                    variant="primary"
                    activePag={activePag}
                    onChangePagination={onChangePagination}
                    limit={paggination.length}
                />
            </div></>
    )
}

export default TableSedes
