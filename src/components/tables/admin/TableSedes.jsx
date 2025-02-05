import { Card, CardBody, CardHeader, Chip, Input, Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react'
import Pagination from '@/share/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getSedesQuery } from '@/redux/slices/sedesSlice';
import { HomeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { formatDate } from '@/hooks/formatDate';
const TableSedes = () => {

    const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const sort = 5;
    const sedes = useSelector((state) => getSedesQuery(state, query));
    const paggination = Array(Math.ceil(sedes.length / sort))
        .fill(0)
        .map((_, i) => i + 1);

    const activePag = useRef(0);
    const [data, setData] = useState(
        sedes.slice(activePag.current * sort, (activePag.current + 1) * sort)
    );
    const onChangePagination = (i) => {
        activePag.current = i;
        setData(
            sedes.slice(activePag.current * sort, (activePag.current + 1) * sort)
        );
    };
      useEffect(() => {
    activePag.current = 0;
    setData(sedes.slice(0 * sort, (0 + 1) * sort));
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
                        {["Nombre", "Nit","Ciudad", "Centro Comercial", "Celular", "Equipos", "Dirección", "Nombre Empresa",""].map((el) => (
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
                        ({ nombre_sede,nit,dv, ciudad, centro_comercial, celular, equipos, direccion_local, nombre_empresa }, key) => {
                            const className = `py-3 px-5 ${key === sedes.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;

                            return (
                                <tr key={nombre_sede}>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {nombre_sede}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
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
                                            {centro_comercial}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {celular}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {equipos.length}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {direccion_local}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {nombre_empresa}
                                        </Typography>
                                    </td>
                                 
                                   
                                    <td className={className}>
                                        <Typography
                                            as="a"
                                            href="#"
                                            className="text-base flex gap-2 font-normal text-blue-gray-600"
                                        >
                                            <PencilIcon className='h-5 w-5' />
                                            <TrashIcon className='w-5 h-5' />
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
