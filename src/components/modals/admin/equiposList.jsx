import TableEquipos from '@/components/tables/admin/TableEquipos';
import { getStatusEmpresa } from '@/redux/slices/empresasSlice';
import { fetchGetEquiposAsync, getSedeEquipo, getShowModal2, getStatusEquipos, setShowModal2 } from '@/redux/slices/equiposSlice';
import { Button, Card, CardHeader, Spinner, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EquipoModal from './equipoModal';

const EquiposList = () => {
    const dispatch = useDispatch();

    const statusEquipos = useSelector(getStatusEquipos);
    const show = useSelector(getShowModal2)
    const sede = useSelector(getSedeEquipo);
    useEffect(() => {
        console.log(sede)
        const getStatus = async () => {
            console.log(sede.id)
             dispatch(fetchGetEquiposAsync({id:sede.id})); 
        };
        if (sede?.id) {
            getStatus();
        }
    }, [sede, show]);
    return (
        <>
            {<div className={`${ show ? "fixed":"hidden"}  z-50 flex p-4 justify-center items-center top-0 left-0 h-full min-h-screen w-full`}>
                <div className='absolute w-full h-full top-0 left-0 bg-black opacity-25'></div>
                <Card className='relative z-10 bg-white w-full max-w-4xl h-auto max-h-[90%] p-4'>
                    <CardHeader variant="gradient" color="indigo" className="mb-8 p-6 flex justify-between gap-2 items-center">
                        <Typography className="text-2xl" variant="h6" color="white">
                           Equipos de {sede && sede.nombre_sede +" "+sede.direccion_local}
                        </Typography>
                        {statusEquipos== "success" && <EquipoModal />}
                    </CardHeader>
                    <div>
                        {statusEquipos == "success" ?
                            <div className=" overflow-hidden px-0 pt-0 pb-2">

                                <TableEquipos>
                                </TableEquipos>
                            </div>

                            : <div className=" w-full h-full min-h-[200px] flex justify-center items-center">
                                <Spinner width={100} /></div>}
                    </div>
                    <div className=' flex justify-end'>
                        <Button onClick={()=> dispatch(setShowModal2({status:false,sede:null}))} color='indigo'>
                            Cerrar
                        </Button>
                    </div>
                </Card>
            </div>}</>
    )
}

export default EquiposList
