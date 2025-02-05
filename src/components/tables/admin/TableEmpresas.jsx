import { Card, CardBody, CardHeader, Chip, Input, Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react'
import Pagination from '@/share/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpresasQuery } from '@/redux/slices/empresasSlice';
import { HomeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

import { formatDate } from '@/hooks/formatDate';
const TableEmpresas = () => {

    const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const sort = 5;
    const empresas = useSelector((state) => getEmpresasQuery(state, query));
    const paggination = Array(Math.ceil(empresas.length / sort))
        .fill(0)
        .map((_, i) => i + 1);

    const activePag = useRef(0);
    const [data, setData] = useState(
        empresas.slice(activePag.current * sort, (activePag.current + 1) * sort)
    );
    const onChangePagination = (i) => {
        activePag.current = i;
        setData(
            empresas.slice(activePag.current * sort, (activePag.current + 1) * sort)
        );
    };
    useEffect(() => {
        activePag.current = 0;
        setData(empresas.slice(0 * sort, (0 + 1) * sort));
      }, [query]);
    return (
        <><div className=' my-4 flex justify-end'>
                        <div className="mr-auto md:mr-4 md:w-56">
                            <Input label="Buscar"
                                onChange={(e) => setQuery(e.target.value.toLowerCase())} value={query} />
                        </div>
                    </div>
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        {["Nombre","Nit", "Ciudad","direccion", "Telefono", "Tiendas vinculadas", "Fecha", "Correo","Contacto", ""].map((el) => (
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
                        ({ nombre_empresa, nit, ciudad,direccion, telefono, tiendas_vinculadas, created_at, correo, contacto }, key) => {
                            const className = `py-3 px-5 ${key === empresas.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;

                            return (
                                <tr key={nombre_empresa}>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {nombre_empresa}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {nit}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {ciudad}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {direccion}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {telefono}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {tiendas_vinculadas.length}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base min-w-[100px] font-normal text-blue-gray-600">
                                            { formatDate( created_at)}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {correo}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {contacto}
                                        </Typography>
                                    </td>
                                    
                                    <td className={className }>
                                        <Typography
                                            as="a"
                                            href="#"
                                            className="text-base flex gap-2 font-normal text-blue-gray-600"
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

export default TableEmpresas
