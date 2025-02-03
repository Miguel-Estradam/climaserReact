import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LOGO from "@/assets/logo_climaser.png";
import FONDO from "@/assets/portada_web_climaser.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { Navigate, Router, useNavigate } from "react-router-dom";

export function SignIn() {
  const { loading, error } = useSelector((state) => state.auth);
  const navigation = useNavigate()
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = { email: '', password: '' };
    let valid = true;

    // Validación del email
    if (formData.email === '') {
      tempErrors.email = 'El correo es obligatorio';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Por favor ingrese un correo válido';
      valid = false;
    }

    // Validación de la contraseña
    if (formData.password === '') {
      tempErrors.password = 'La contraseña es obligatoria';
      valid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Si el formulario es válido, puedes continuar con el envío
      console.log(formData);
      
    dispatch(login(formData));
      
    } else {
      // Si hay errores, muestra un mensaje
      Swal.fire({
        title: 'Error!',
        text: 'Por favor revisa los campos con errores.',
        icon: 'error',
        confirmButtonText: 'Revisar'
      });
    }
  };

  
  useEffect(() => {
    console.log(user);
    if (user) {
      console.log("Redirigiendo a Home...");
      setTimeout(() => {
        location.replace("/dashboard/home")
      }, 100);
    }
  }, [user]);
  return (
    <section className="flex gap-4">
      <div className="w-full lg:w-3/5 mt-24 flex flex-col justify-center items-center">
        <div className="text-center flex justify-center">
          <img src={LOGO} alt="" className="h-32 pb-3" />
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Correo
            </Typography>
            <Input
              size="lg"
              name="email"
              placeholder="ejemplo@gmail.com"
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${errors.email ? 'border-red-500' : ''}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <Typography variant="small" color="red" className="text-xs">{errors.email}</Typography>}

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Contraseña
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              placeholder="********"
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${errors.password ? 'border-red-500' : ''}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <Typography variant="small" color="red" className="text-xs">{errors.password}</Typography>}
          </div>
           
          <Button type="submit" className="mt-6 bg-secondary flex justify-center gap-2" fullWidth>
            Ingresar
  {loading && <Spinner />}
          </Button>
              {error && <Typography style={{ color: "red" }}>{error}</Typography>}

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">Recordar contraseña</a>
            </Typography>
          </div>
        </form>
      </div>
      <div className="m-8 w-3/5 h-full hidden lg:block">
        <img src={FONDO} className="h-full w-full min-h-[90vh] object-cover rounded-3xl" />
      </div>
    </section>
  );
}

export default SignIn;
