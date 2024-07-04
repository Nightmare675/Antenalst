// Clase para gestionar la cuadrícula y las antenas
class Grid {
    constructor(size, radioAntena) {
        this.size = size;
        this.radioAntena = radioAntena;
        this.grid = Array.from({ length: size }, () => Array.from({ length: size }, () => ({ covered: false, numAntennas: 0 })));
    }

    // Método para colocar una antena en una posición dada
    placeAntenna(x, y) {
        if (this.isValidPosition(x, y) && !this.grid[x][y].covered) {
            this.grid[x][y].covered = true;
            this.updateCoverage(x, y, true);
            return true;
        }
        return false;
    }

    // Método para actualizar la cobertura de las antenas vecinas
    updateCoverage(x, y, increment) {
        const r = this.radioAntena;
        for (let i = Math.max(0, x - r); i <= Math.min(this.size - 1, x + r); i++) {
            for (let j = Math.max(0, y - r); j <= Math.min(this.size - 1, y + r); j++) {
                if (Math.sqrt((x - i) ** 2 + (y - j) ** 2) <= r) {
                    this.grid[i][j].numAntennas += increment ? 1 : -1;
                }
            }
        }
    }

    // Método para verificar si una posición es válida dentro de la cuadrícula
    isValidPosition(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    // Método para obtener el número total de antenas colocadas
    getTotalAntennas() {
        return this.grid.flat().reduce((total, cell) => total + cell.numAntennas, 0);
    }

    // Método para calcular el costo total de implementación
    getTotalCost(costoImplementacion) {
        return this.getTotalAntennas() * costoImplementacion;
    }

    // Método para generar coordenadas estratégicas de antenas
    generateAntennaCoordinates() {
        const coordinates = [];

        // Distribuir antenas de manera más espaciada en la cuadrícula
        for (let x = 0; x < this.size; x += 5) {
            for (let y = 0; y < this.size; y += 5) {
                if (x < this.size && y < this.size) {
                    coordinates.push([x, y]);
                }
            }
        }

        return coordinates;
    }
}

// Función para calcular el número mínimo de antenas y el costo total de implementación
function calcularMinimoNumeroAntenas(areaTotal, porcentajeCobertura, radioAntena, costoImplementacion) {
    const ladoCuadrado = Math.sqrt(areaTotal);
    const grid = new Grid(ladoCuadrado, radioAntena);

    let areaCoberturaTotal = 0;

    // Generar coordenadas estratégicas de antenas
    const coordenadas = grid.generateAntennaCoordinates();

    // Colocar antenas en las coordenadas generadas
    coordenadas.forEach(coord => {
        const [x, y] = coord;
        grid.placeAntenna(x, y);
        areaCoberturaTotal += Math.PI * radioAntena * radioAntena;
    });

    // Calcular el área mínima necesaria para cumplir con el porcentaje de cobertura
    const areaNecesaria = porcentajeCobertura * areaTotal;

    // Calcular antenas adicionales necesarias para cumplir con el porcentaje de cobertura
    for (let x = 0; x < ladoCuadrado; x++) {
        for (let y = 0; y < ladoCuadrado; y++) {
            if (!grid.grid[x][y].covered) {
                grid.placeAntenna(x, y);
                areaCoberturaTotal += Math.PI * radioAntena * radioAntena;
            }

            if (areaCoberturaTotal >= areaNecesaria) {
                return { numAntenas: grid.getTotalAntennas(), costoTotal: grid.getTotalCost(costoImplementacion) };
            }
        }
    }

    return { numAntenas: grid.getTotalAntennas(), costoTotal: grid.getTotalCost(costoImplementacion) };
}

// Ejemplo de uso
const areaTotal = 2180; // Área total en metros cuadrados
const porcentajeCobertura = 0.95; // Porcentaje de cobertura requerido (95%)
const radioAntena = 160; // Radio de cobertura de una antena en metros
const costoImplementacion = 199; // Costo de implementación de cada antena en dólares

const resultado = calcularMinimoNumeroAntenas(areaTotal, porcentajeCobertura, radioAntena, costoImplementacion);
console.log(`El número mínimo de antenas necesario es: ${resultado.numAntenas}`);
console.log(`El costo total de implementación es: ${resultado.costoTotal} dólares`);

