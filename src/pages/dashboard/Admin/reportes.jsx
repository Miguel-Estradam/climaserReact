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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { fetchGetProveedorAsync, getStatusProveedor } from "@/redux/slices/proveedoresSlice";
import TableProveedores from "@/components/tables/admin/TableProveedores";
import { useDispatch, useSelector } from "react-redux";
import { use } from "react";
import { fetchGetSedesAsync, getStatusSedes } from "@/redux/slices/sedesSlice";
import ProveedorModal from "@/components/modals/admin/proveedorModal";

export function ResportesPageA() {

  const dispatch = useDispatch();

  const statusPreveedores = useSelector(getStatusProveedor);
  const statusSedes = useSelector(getStatusSedes);
  useEffect(() => {
    const getStatus = async () => {
      if (statusPreveedores === "idle" || statusPreveedores === "loading") {
            dispatch(fetchGetProveedorAsync());
      }
      if (statusSedes === "idle" || statusSedes === "loading") {
            dispatch(fetchGetSedesAsync());
      }
    
    };
    getStatus();
  }, []);
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-indigo-900/75" />
      </div>
      <div className=" mb-8 -mt-16 mx-3 lg:mx-4 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="indigo" className="mb-8 p-6 flex justify-between items-center">
            <Typography className="text-2xl" variant="h6" color="white">
              Reportes
            </Typography>
            <Button color="white">{ statusSedes == "success" && <ProveedorModal/>}</Button>
          </CardHeader>
          {statusPreveedores == "success" ?
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">

            </CardBody>

            : <div className=" w-full h-full min-h-[200px] flex justify-center items-center">
              <Spinner width={100} /></div>}
        </Card>
      </div>
    </>
  );
}

export default ResportesPageA;
