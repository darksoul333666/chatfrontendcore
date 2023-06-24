const unidadesMonetarias = 'pesos';

function convertirNumeroAPalabras(numero) {
    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const especiales = {
      10: 'diez',
      11: 'once',
      12: 'doce',
      13: 'trece',
      14: 'catorce',
      15: 'quince',
      20: 'veinte',
      30: 'treinta',
      40: 'cuarenta',
      50: 'cincuenta',
      60: 'sesenta',
      70: 'setenta',
      80: 'ochenta',
      90: 'noventa'
    };
    const miles = ['mil'];
  
    if (numero < 10) {
      return unidades[numero];
    } else if (numero < 16) {
      return especiales[numero];
    } else if (numero < 20) {
      return 'dieci' + unidades[numero - 10];
    } else if (numero === 20) {
      return 'veinte';
    } else if (numero < 30) {
      return 'veinti' + unidades[numero - 20];
    } else if (numero < 100) {
      const decenas = Math.floor(numero / 10) * 10;
      const resto = numero % 10;
      if (resto === 0) {
        return especiales[decenas];
      } else {
        return especiales[decenas] + ' y ' + unidades[resto];
      }
    } else if (numero < 1000) {
      const centenas = Math.floor(numero / 100);
      const resto = numero % 100;
      if (resto === 0) {
        if (centenas === 1) {
          return 'cien';
        } else if (centenas === 7) {
          return 'setecientos';
        } else if (centenas === 5) {
          return 'quinientos';
        } else if (centenas === 9) {
          return 'novecientos';
        } else {
          return unidades[centenas] + 'cientos';
        }
      } else {
        return convertirNumeroAPalabras(centenas * 100) + ' ' + convertirNumeroAPalabras(resto);
      }
    } else if (numero < 2000) {
      const resto = numero % 1000;
      if (resto === 0) {
        return miles[0];
      } else {
        return miles[0] + ' ' + convertirNumeroAPalabras(resto);
      }
    } else if (numero < 10000) {
      const millares = Math.floor(numero / 1000);
      const resto = numero % 1000;
      if (resto === 0) {
        return convertirNumeroAPalabras(millares) + ' mil';
      } else {
        return convertirNumeroAPalabras(millares) + ' mil ' + convertirNumeroAPalabras(resto);
      }
    }
    // Puedes agregar más reglas para números mayores según tus necesidades
  
    // Si el número no se encuentra dentro de las reglas definidas, devolvemos una cadena vacía
    return '';
  }
  
  function convertirTextoAPalabras(texto) {
    const regex = /(\$?\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g; // Expresión regular para encontrar números con delimitadores en el texto
  
    // Reemplazar cada número encontrado en el texto por su equivalente en palabras
    const textoConvertido = texto.replace(regex, (match) => {
      const numeroSinDelimitadores = removeDelimitersFromQuantity(match);
      const numeroEnPalabras = convertirNumeroAPalabras(Number(numeroSinDelimitadores));
  
      // Agregar "pesos" al final del número si está precedido por el símbolo "$"
      if (match.startsWith('$')) {
        return `${numeroEnPalabras}`;
      } else {
        return numeroEnPalabras;
      }
    });
  
    return textoConvertido;
  }
  
  function removeDelimitersFromQuantity(quantity) {
    return quantity.replace(/\$|,/g, '');
  }
  

  export default convertirTextoAPalabras;
  