import ReporteModal from "@/components/modals/proveedor/reporteModal"
import { fetchGetProveedorAsync, getStatusProveedor } from "@/redux/slices/proveedoresSlice";
import { fetchGetSedesAsync, getStatusSedes } from "@/redux/slices/sedesSlice";
import { getUser } from "@/services/authServices";
import { Card, CardHeader, Spinner, Typography } from "@material-tailwind/react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const ReportesPPage = () => {
  const dispatch = useDispatch();
 const statusPreveedores = useSelector(getStatusProveedor);

  const user = useSelector((state) => state.auth.user);
  const proveedor = useSelector((state) => state.proveedor.proveedores);
 
  const statusSedes = useSelector(getStatusSedes);
  useEffect(() => {
    const getStatus = async () => {
       console.log("user",user)
       if (statusPreveedores === "idle" || statusPreveedores === "loading") {
                  dispatch(fetchGetProveedorAsync(user.sub));
            }
     };
    getStatus();
  }, []);
  useEffect(() => {
     console.log(proveedor)
    
     
     if (proveedor.nombre_sede) {
        if (statusSedes === "idle" || statusSedes === "loading"){dispatch(fetchGetSedesAsync(proveedor.nombre_sede));}
   
    }
  }, [proveedor]);
  return (
    <> 
      <ReporteModal></ReporteModal>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-indigo-900/75" />
      </div>
      <div className=" mb-8 -mt-16 mx-3 lg:mx-4 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="indigo" className="mb-8 p-6 flex justify-between items-center">
            <Typography className="text-2xl" variant="h6" color="white">
              Reportes
            </Typography>
          {/* { statusSedes == "success" && <ProveedorModal/>} */}
          </CardHeader>
          {/* {statusPreveedores == "success" ?
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">

            </CardBody>

            : <div className=" w-full h-full min-h-[200px] flex justify-center items-center">
              <Spinner width={100} /></div>} */}
        </Card>
      </div>
    </>
  )
}

export default ReportesPPage
