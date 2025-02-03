import Swal from 'sweetalert2';

const actionTextMap = {
  add: 'registro',
  update: 'actualizo',
  delete: 'elimino',
  deleteMany: 'eliminaron',
  repair: 'reparo',
};

export const showAlert = (message) => {
  Swal.fire({
    html: message,
    icon: 'info',
    confirmButtonText: 'Ok',
  });
};

export const showError = (message) => {
  Swal.fire({
    title: 'Oops',
    html: message,
    icon: 'error',
    confirmButtonText: 'Ok',
  });
};

export const showSuccess = (message) => {
  Swal.fire({
    html: message,
    icon: 'success',
  });
};

export const showErrorMessage = ({ obj, error, action }) => {
  const actionText = actionTextMap[action];
  const message = `Algo anda mal, no se ${actionText} el ${obj}.<br> ${error}`;
  showError(message);
};

export const showErrorMessageExist = ({ obj, action }) => {
  const actionText = actionTextMap[action];
  const message = `Algo anda mal, no se ${actionText} el ${obj}.<br> ya existe`;
  showError(message);
};

export const showErrorForGetData = ({ obj, error }) => {
  const message = `Algo anda mal, no se pudo consultar el objeto: ${obj}.<br> ${error}`;
  showError(message);
};

export const showSuccessMessage = ({ obj, action }) => {
  const actionText = actionTextMap[action];
  Swal.fire({
    text: `¡${obj} se ${actionText} con éxito!`,
    icon: 'success',
  });
};
