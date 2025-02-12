import { Button, Card, CardBody, CardHeader, Chip, Input, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react'
import Pagination from '@/share/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {  getEquiposQuery, setFormAction, setShowModal, setEquipoToEdit, fetchGetEquiposAsync, getSedeEquipo } from '@/redux/slices/equiposSlice';
import { EllipsisVerticalIcon, HomeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { formatDate } from '@/hooks/formatDate';
import Swal from 'sweetalert2';
import { deleteEquipo } from '@/services/equiposService';
import { fetchGetSedesAsync } from '@/redux/slices/sedesSlice';
const TableEquipos = () => {

    const dispatch = useDispatch();

    const sede = useSelector(getSedeEquipo);
    const [query, setQuery] = useState("");
    const sort = 5;
    const equipos = useSelector((state) => getEquiposQuery(state, query));
    const paggination = Array(Math.ceil(equipos.length / sort))
        .fill(0)
        .map((_, i) => i + 1);

    const activePag = useRef(0);
    const [data, setData] = useState(
        equipos.slice(activePag.current * sort, (activePag.current + 1) * sort)
    );
    const onChangePagination = (i) => {
        activePag.current = i;
        setData(
            equipos.slice(activePag.current * sort, (activePag.current + 1) * sort)
        );
    };
    useEffect(() => {
          console.log(equipos)
    activePag.current = 0;
    setData(equipos.slice(0 * sort, (0 + 1) * sort));
      }, [query]);
    const onClickDeleteEquipo = (id) => {
            Swal.fire({
              title: "¿Estas seguro?",
              text: "Una vez eliminado, ¡no podrá recuperar el Empresa!",
              icon: "warning",
              showCloseButton: true,
              showCancelButton: true,
                confirmButtonColor: "#dc3545",
              cancelButtonColor:"#000",
              confirmButtonText: "Eliminar",
              cancelButtonText: "Cancelar",
            }).then((res) => {
              if (res.isConfirmed) {
                  deleteEquipo(id).then(() => {
                      dispatch(fetchGetEquiposAsync({id:sede.id}));
                      dispatch(fetchGetSedesAsync());
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
            <div className='w-full  overflow-x-scroll border border-gray-400 rounded-md p-2'>
                <table className="w-full min-w-[640px] table-auto ">
                <thead>
                    <tr>
                        {["Marca", "Modelo","Modelo condensadora", "Serie", "Tipo", "Capacidad", "Tipo refrigerante", "Observaciones","opciones"].map((el) => (
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
                        (equipo, key) => {
                            const className = `py-3 px-5 ${key === equipos.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;

                            return (
                                <tr key={equipo.marca+key}>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {equipo.marca}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {equipo.modelo}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {equipo.modelo_condensadora}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {equipo.serie}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {equipo.tipo}
                                        </Typography>
                                    </td>
                                    {/* <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {equipo.equipos[0] == ""?0: equipo.equipos.length}
                                        </Typography>
                                    </td> */}
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {equipo.capacidad}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {equipo.tipo_refrigerante}
                                        </Typography>
                                    </td>
                                    <td className={className + "min-w-[250px]"}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {equipo.observaciones}
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
                                                    dispatch(setEquipoToEdit(equipo))
                                                    // // dispatch(setFormAction("update"));
                                                }}>Editar equipo</MenuItem>
                                                <MenuItem onClick={() => {
                                                    onClickDeleteEquipo(equipo.id)
                                                }}>Eliminar</MenuItem>
                                                <MenuItem onClick={() => {
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
            </div>
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

export default TableEquipos
