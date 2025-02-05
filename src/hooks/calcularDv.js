// export const calcularDV = (nit) => {
//     const pesos = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47];  // Pesos específicos para el cálculo
//     const nitArray = nit.split('').map(Number);  // Convertir el NIT a un array de números
//     let suma = 0;
  
//     // Realizamos la multiplicación por los pesos
//     for (let i = 0; i < nitArray.length; i++) {
//       suma += nitArray[i] * pesos[i % pesos.length];
//     }
  
//     // Calculamos el residuo
//     const residuo = suma % 11;
//     const dv = 11 - residuo;
  
//     if (dv === 11) return '0';
//     if (dv === 10) return '1';
//     return dv;
//   };
  
  export const calcularDV=(numNit)=> {
    var vpri, x, y, z;
    let stringNit = numNit.toString();
    // Se limpia el Nit
    // numNit = numNit.replace(/\s/g, ''); // Espacios
    // numNit = numNit.replace(/,/g, ''); // Comas
    // numNit = numNit.replace(/\./g, ''); // Puntos
    // numNit = numNit.replace(/-/g, ''); // Guiones

    // Se valida el nit
    if (isNaN(numNit)) {
      alert("El nit/cédula '" + numNit + "' no es válido(a).");
      return '';
    }

    // Procedimiento
    vpri = new Array(16);
    z = stringNit.length;

    vpri[1] = 3;
    vpri[2] = 7;
    vpri[3] = 13;
    vpri[4] = 17;
    vpri[5] = 19;
    vpri[6] = 23;
    vpri[7] = 29;
    vpri[8] = 37;
    vpri[9] = 41;
    vpri[10] = 43;
    vpri[11] = 47;
    vpri[12] = 53;
    vpri[13] = 59;
    vpri[14] = 67;
    vpri[15] = 71;

    x = 0;
    y = 0;
    for (var i = 0; i < z; i++) {
      y = stringNit.substr(i, 1);

      x += y * vpri[z - i];
    }

    y = x % 11;

    return y > 1 ? 11 - y : y;
  }