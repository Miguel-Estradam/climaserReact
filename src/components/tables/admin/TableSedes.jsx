import { Button, Card, CardBody, CardHeader, Chip, Input, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react'
import Pagination from '@/share/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetSedesAsync, getSedesQuery, setFormAction, setSedeToEdit, setShowModal } from '@/redux/slices/sedesSlice';
import { EllipsisVerticalIcon, HomeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { formatDate } from '@/hooks/formatDate';
import Swal from 'sweetalert2';
import { deleteSede } from '@/services/sedesServices';
import { setShowModal2 } from '@/redux/slices/equiposSlice';
import { fetchGetEmpresasAsync } from '@/redux/slices/empresasSlice';
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
    const onClickDeleteSede = (id) => {
        Swal.fire({
            title: "¿Estas seguro?",
            text: "Una vez eliminado, ¡no podrá recuperar el Empresa!",
            icon: "warning",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#000",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        }).then((res) => {
            if (res.isConfirmed) {
                deleteSede(id).then(() => {
                    dispatch(fetchGetSedesAsync());
                    dispatch(fetchGetEmpresasAsync());
                });
            }
        });
    };
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
                        {["Nombre", "Código", "Ciudad", "Centro Comercial", "Celular", "Dirección", "Nombre Empresa", "opciones"].map((el) => (
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
                        (sede, key) => {
                            const className = `py-3 px-5 ${key === sedes.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;

                            return (
                                <tr key={sede.nombre_sede + key}>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {sede.nombre_sede}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {sede.nit}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {sede.ciudad}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {sede.centro_comercial}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {sede.celular}
                                        </Typography>
                                    </td>
                                    {/* <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {sede.equipos[0] == "" ? 0 : sede.equipos.length}
                                        </Typography>
                                    </td> */}
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {sede.direccion_local}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {sede.nombre_empresa}
                                        </Typography>
                                    </td>


                                    <td className={className}>
                                        <Menu >
                                            <MenuHandler className="flex justify-center h-full">
                                                <div><Button color="indigo" className='p-2 '>   <EllipsisVerticalIcon className=" h-5 w-5 " /></Button>
                                                </div>
                                            </MenuHandler>
                                            <MenuList>
                                                <MenuItem onClick={() => {
                                                    dispatch(setShowModal(true));
                                                    dispatch(setSedeToEdit(sede))
                                                    // dispatch(setFormAction("update"));
                                                }}>Editar sede</MenuItem>
                                                <MenuItem onClick={() => {
                                                    onClickDeleteSede(sede.id)
                                                }}>Eliminar</MenuItem>
                                                <MenuItem onClick={() => {
                                                    dispatch(setShowModal2({status:true, sede:sede }))
                                                    // onClickDeleteEmpresa(empresa.id)
                                                }}>Ver equipos</MenuItem>
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

export default TableSedes
