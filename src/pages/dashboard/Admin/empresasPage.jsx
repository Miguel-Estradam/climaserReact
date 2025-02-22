import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Spinner,
  Button,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { use } from "react";
import { fetchGetEmpresasAsync, getStatusEmpresa } from "@/redux/slices/empresasSlice";
import TableEmpresas from "@/components/tables/admin/TableEmpresas";
import { fetchGetSedesAsync, getStatusSedes } from "@/redux/slices/sedesSlice";
import TableSedes from "@/components/tables/admin/TableSedes";
import EmpresaModal from "@/components/modals/admin/empresaModal";
import SedeModal from "@/components/modals/admin/sedeModal";
import EquiposList from "@/components/modals/admin/equiposList";

export function EmpresasPage() {

  const dispatch = useDispatch();

  const statusEmpresas = useSelector(getStatusEmpresa);
  const statusSedes = useSelector(getStatusSedes);
  useEffect(() => {
    const getStatus = async () => {
      if (statusEmpresas === "idle" || statusEmpresas === "loading"){dispatch(fetchGetEmpresasAsync());}
      if (statusSedes === "idle" || statusSedes === "loading"){dispatch(fetchGetSedesAsync());}
    };
    getStatus();
  }, []);
  return (
    <>
      <EquiposList/>
      <div className="hidden md:block relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-indigo-900/75" />
      </div>
      <div className="mt-8 mb-8 md:-mt-16 mx-3 lg:mx-4 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="indigo" className="mb-8 p-6 flex justify-between items-center">
            <Typography className="text-2xl" variant="h6" color="white">
              Empresas
            </Typography>
           { statusEmpresas == "success" && <EmpresaModal/>}
          </CardHeader>
          {statusEmpresas == "success" ?
            <CardBody className="overflow-x-scroll min-h-[300px] px-0 pt-0 pb-2">

              <TableEmpresas>
              </TableEmpresas>
            </CardBody>

            : <div className=" w-full h-full min-h-[200px] flex justify-center items-center">
              <Spinner width={100} /></div>}
        </Card>
        <Card>
          <CardHeader variant="gradient" color="indigo" className="mb-8 p-6 flex justify-between items-center">
            <Typography className="text-2xl" variant="h6" color="white">
              Sedes
            </Typography>
            <SedeModal></SedeModal>
          </CardHeader>
          {statusSedes == "success" ?
            <CardBody className="overflow-x-scroll  px-0 pt-0 pb-2">

              <TableSedes>
              </TableSedes>
            </CardBody>

            : <div className=" w-full h-full min-h-[400px] flex justify-center items-center">
              <Spinner width={100} /></div>}
        </Card>
      </div>
    </>
  );
}

export default EmpresasPage;
