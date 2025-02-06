import { Button, Input, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react'
import Pagination from '@/share/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetEmpresasAsync, getEmpresasQuery, setEmpresaToEdit, setFormAction, setShowModal } from '@/redux/slices/empresasSlice';
import { EllipsisVerticalIcon, HomeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

import { formatDate } from '@/hooks/formatDate';
import { deleteEmpresa } from '@/services/empresasService';
import Swal from 'sweetalert2';
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
    
     const onClickDeleteEmpresa = (id) => {
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
            deleteEmpresa(id).then(() => {
              dispatch(fetchGetEmpresasAsync());
            });
          }
        });
      };
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
                        {["Nombre","Nit", "Ciudad","direccion", "Telefono", "Tiendas vinculadas", "Fecha", "Correo","Contacto", "opciones"].map((el) => (
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
                        (empresa, key) => {
                            const className = `py-3 px-5 ${key === empresas.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;

                            return (
                                <tr key={empresa.nombre_empresa +key}>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {empresa.nombre_empresa}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {empresa.nit +'-'+empresa.dv}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {empresa.ciudad}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {empresa.direccion}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base  font-normal text-blue-gray-600">
                                            {empresa.telefono}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {empresa.tiendas_vinculadas[0] =="" ? 0:empresa.tiendas_vinculadas.length}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base min-w-[100px] font-normal text-blue-gray-600">
                                            { formatDate( empresa.created_at)}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {empresa.correo}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography className="text-base font-normal text-blue-gray-600">
                                            {empresa.contacto}
                                        </Typography>
                                    </td>
                                    
                                    <td className={className }>
                                        <Menu >
                                            <MenuHandler className="flex justify-center h-full">
                                                <div><Button color="indigo" className='p-2 '>   <EllipsisVerticalIcon className=" h-5 w-5 " /></Button>
                                             </div>
                                            </MenuHandler>
                                            <MenuList>
                                                <MenuItem onClick={() => {
                                                    dispatch(setShowModal(true));
                                                    dispatch(setEmpresaToEdit(empresa))
                                                    dispatch(setFormAction("update"));
                                                }}>Editar empresa</MenuItem>
                                                <MenuItem onClick={() => {
                                                    onClickDeleteEmpresa(empresa.id)
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

export default TableEmpresas
