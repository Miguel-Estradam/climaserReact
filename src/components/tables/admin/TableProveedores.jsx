import { Button, Card, CardBody, CardHeader, Chip, Input, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react'
import Pagination from '@/share/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProveedorQuery, setFormAction, setProveedorToEdit, setShowModal } from '@/redux/slices/proveedoresSlice';
import { EllipsisVerticalIcon, HomeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
const TableProveedores = () => {

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
            proveedores.slice(activePag.current * sort, (activePag.current + 1) * sort)
        );
    };
    useEffect(() => {
        activePag.current = 0;
        setData(proveedores.slice(0 * sort, (0 + 1) * sort));
    }, [query]);
    return (
        <>
            <div className=' my-4 flex justify-end'>
                <div className="mr-auto md:mr-4 md:w-56">
                    <Input label="Buscar"
                        onChange={(e) => setQuery(e.target.value.toLowerCase())} value={query} />
                </div>
            </div>
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        {["Nombre", "Ciudad", "Sedes", "Fecha", "Correo", "opciones"].map((el) => (
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
                    {data.map(
                        (proveedor, key) => {
                            const className = `py-3 px-5 ${key === proveedores.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;

                            return (
                                <tr key={proveedor.nombre_proveedor}>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {proveedor.nombre_proveedor}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {proveedor.ciudad}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {proveedor.nombre_sede.length}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {proveedor.fecha}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {proveedor.correo}
                                        </Typography>
                                    </td>
                                    {/* <td className={className}>
                                        <Chip
                                            variant="gradient"
                                            color={novedades_activo ? "green" : "blue-gray"}
                                            value={novedades_activo ? "Activo" : "desactivado"}
                                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                        />
                                    </td> */}
                                    <td className={className +'flex justify-center'}>
                                        <Menu>
                                            <MenuHandler>
                                             <Button color="indigo" className='p-2'>   <EllipsisVerticalIcon className=" h-5 w-5 " /></Button>
                                                                                          
                                            </MenuHandler>
                                            <MenuList>
                                                <MenuItem onClick={() => {
                                                    dispatch(setShowModal(true));
                                                    dispatch(setProveedorToEdit(proveedor))
                                                    dispatch(setFormAction("update"));
                                                }}>Editar Proveedor</MenuItem>
                                                <MenuItem onClick={() => {
                                                    // dispatch(fetchGetProveedorAsync(true));
                                                }}>Eliminar</MenuItem>
                                            </MenuList>

                                        </Menu>

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

export default TableProveedores
