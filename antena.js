// Función modificada para calcular el número mínimo de antenas y sus coordenadas
function minimoNumeroAntenas(areaTotal, porcentajeCobertura, radioAntena, costoImplementacion) {
    // Calcular la longitud del lado del área cuadrada
    const ladoCuadrado = Math.sqrt(areaTotal);

    // Diámetro de la cobertura de una antena
    const diametroAntena = 2 * radioAntena;

    // Número de antenas necesarias en cada dimensión (horizontal y vertical)
    const numAntenasLado = Math.ceil(ladoCuadrado / diametroAntena);

    // Calculamos el número total de antenas
    const numAntenasTotal = numAntenasLado * numAntenasLado;

    // Calculamos el costo total de implementación de todas las antenas
    const costoTotal = numAntenasTotal * costoImplementacion;

    // Calculamos las coordenadas de cada antena
    const coordenadas = [];
    for (let i = 0; i < numAntenasLado; i++) {
        for (let j = 0; j < numAntenasLado; j++) {
            const x = i * diametroAntena + radioAntena;
            const y = j * diametroAntena + radioAntena;
            coordenadas.push({ x: x, y: y });
        }
    }

    // Aseguramos cubrir al menos el 95% del área
    const areaCoberturaTotal = numAntenasTotal * (Math.PI * Math.pow(radioAntena, 2));
    const areaNecesaria = porcentajeCobertura * areaTotal;

    // Si el área de cobertura total es suficiente, retornamos el número de antenas calculado y el costo total
    if (areaCoberturaTotal >= areaNecesaria) {
        return { numAntenas: numAntenasTotal, costoTotal: costoTotal, coordenadas: coordenadas };
    }

    // En caso contrario, incrementamos el número de antenas y recalculamos
    return { numAntenas: numAntenasTotal + 1, costoTotal: (numAntenasTotal + 1) * costoImplementacion, coordenadas: coordenadas };
}

// Parámetros de entrada
const areaTotal = 2180; // Área total en metros cuadrados
const porcentajeCobertura = 0.95; // Porcentaje de cobertura requerido (95%)
const radioAntena = 160; // Radio de cobertura de una antena en metros
const costoImplementacion = 875; // Costo de implementación de cada antena en dólares

// Llamada a la función para obtener el resultado
const resultado = minimoNumeroAntenas(areaTotal, porcentajeCobertura, radioAntena, costoImplementacion);

// Impresión de resultados
console.log(`El número mínimo de antenas necesario es: ${resultado.numAntenas}`);
console.log(`El costo total de implementación es: ${resultado.costoTotal} dólares`);
console.log('Las coordenadas de las antenas son:');
resultado.coordenadas.forEach((coordenada, index) => {
    console.log(`Antena ${index + 1}: (${coordenada.x}, ${coordenada.y})`);
});
