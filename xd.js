/* ----------------------------------------------------
    Constantes para usar en las operaciones
   ----------------------------------------------------  */
/* Periodos (meses) */
const periodosPorAnio = {
    anual: 1,
    semestral: 2,
    cuatrimestral: 3,
    trimensual: 4,
    bimensual: 6,
    mensual: 12
}

/* Periodos (meses) */
const periodosMeses = {
    anual: 12,
    semestral: 6,
    cuatrimestral: 4,
    trimensual: 3,
    bimensual: 2,
    mensual: 1
}

/* Periodos (dias) */
const periodosDias = {
    anual: 360,
    semestral: 180,
    cuatrimestral: 120,
    trimensual: 90,
    bimensual: 60,
    mensual: 30
}

/* Combinaciones para canvertir */
const conversiones = {
    nominalNominales: ['nominal', 'nominal'],
    nominalEfectivas: ['nominal', 'efectiva'],
    efectivaEfectivas: ['efectiva', 'efectiva'],
    efectivaNominales: ['efectiva', 'nominales'],
    nominalAnticipadas: ['nominal', 'anticipada'],
    efectivaAnticipadas: ['efectiva', 'anticipada'],
    anticipadaNominales: ['anticipada', 'nominal'],
    anticipadaEfectiva: ['anticipada', 'efectiva']
}

const operaciones = {
    nominalNominales: function( formData ) {
        const result = nominalNominales(formData);
        return result;
    },
    nominalEfectivas: function( formData ) {
        

        return result;
    },
    efectivaEfectivas: function( formData ) {
        xd

        return result;
    },
    efectivaNominales: function( formData ) {
        xd

        return result;
    },
    nominalAnticipadas: function( formData ) {
        xd

        return result;
    },
    efectivaAnticipadas: function( formData ) {
        xd

        return result;
    },
    anticipadaNominales: function( formData ) {
        xd

        return result;
    },
    anticipadaEfectiva: function( formData ) {
        xd

        return result;
    }
}

// pasar tasa a decimales
function tasaDecimal( data ) {
    return data.tasa / 100;
}

/* ----------------------------------------------------
    Funcion para mostrar la forma de pago de intereses
   ----------------------------------------------------  */
/*
document.addEventListener("DOMContentLoaded", function() {
    // quitar el select de la forma de pago en caso de que sea tasa nominal
    const tipoTasaSelect = document.getElementById("tipoTasa");
    const containerFormaPago = document.getElementById("containerFormaPago");
    let tipoTasa = tipoTasaSelect.value;
    // quitar la capitalizacion si no se la usa
    const tasaSolicitaSelect = document.getElementById("tasaSolicita");
    const containerCapitalizacion = document.getElementById("containerCapitalizacion");
    let tasaSolicita = tasaSolicitaSelect.value;

    // Funciones para modificar los selects
    tipoTasaSelect.addEventListener("change", function() {
        if (tasaSolicita == 'nominal' && tipoTasaSelect.value == 'nominal') {
            containerFormaPago.classList.add("hiden");
            containerCapitalizacion.classList.add("hiden");
            tipoTasa = tipoTasaSelect.value;
        } else if (tasaSolicita == 'efectiva' && tipoTasaSelect.value == 'efectiva') {
            containerFormaPago.classList.remove("hiden");
            containerCapitalizacion.classList.add("hiden");
            tipoTasa = tipoTasaSelect.value;
        } else if (tipoTasaSelect.value == 'nominal') {
            containerFormaPago.classList.add("hiden");
            containerCapitalizacion.classList.remove("hiden");
            tipoTasa = tipoTasaSelect.value;
        } else {
            containerFormaPago.classList.remove("hiden");
            containerCapitalizacion.classList.remove("hiden");
            tipoTasa = tipoTasaSelect.value;
        }
    });
    tasaSolicitaSelect.addEventListener("change", function() {
        if ((tasaSolicitaSelect.value == 'nominal' && tipoTasa == 'nominal') || (tasaSolicitaSelect.value == 'efectiva' && tipoTasa == 'efectiva')) {
            containerCapitalizacion.classList.add("hiden");
            tasaSolicita = tasaSolicitaSelect.value;
        } else {
            containerCapitalizacion.classList.remove("hiden");
            tasaSolicita = tasaSolicitaSelect.value;
        }
    });
});
*/

/* ----------------------------------------------------
    Funciones para convertir las tasas
   ----------------------------------------------------  */

// Pasar de TN a TE
// Recibe objeto con todas las tasas nominales y capitalizacion
function nominalEfectivas( data, tipoCapitalizacion ) {
    const tasasNominales = nominalNominales(data);
    const capitalizacion = periodosDias[tipoCapitalizacion];
    
    const tasasEfectivas = {}; // Objeto para guardar las tasas
    
    const keys = Object.keys(periodosDias);
    for (const key of keys) {
        const m = periodosDias[key] / capitalizacion;   // m = Periodo solicitado / capitalizacion
        const tasaEfectiva = Math.pow(1 + (tasasNominales[key] / m), m) - 1;    // formula para pasar a nominal
        tasasEfectivas[key] = tasaEfectiva.toFixed(5); // guardamos los resultados en el objeto
    }

    return tasasEfectivas;
};

// Pasar de TE a TN
// Recibe tasa efectiva con periodo y capitalizacion
function efectivaNominales( data ) {
    const tasa = tasaDecimal(data);
    const periodo = periodosDias[data.periodo];
    const capitalizacion = periodosDias[data.capitalizacion];

    const tasasNominales = {};

    const keys = Object.keys(periodosDias);
    for (const key of keys) {
        const exponente = capitalizacion / periodo; // P2 / Pt

        const tasaNominal = (periodosDias[key] / capitalizacion)*(Math.pow(1 + tasa, exponente) - 1); // formula para convertir las TE a TN
        tasasNominales[key] = tasaNominal.toFixed(5); // guardamos los resultados en el objeto*/
    }

    return tasasNominales;
};

// Pasar de TE vencida a TE anticipada
// Recibe objeto con todas las tasas efectivas
function vencidaAnticipada( data ) {
    const tasasEfectivas = efectivaEfectivas(data);

    const tasasAnticipadas = {}; // Objeto para guardar las tasas

    const keys = Object.keys(tasasEfectivas);
    for (const key of keys) {
        const tasaAnticipada = tasasEfectivas[key] / (1 + tasasEfectivas[key]);// Formula para la pasar a tansa anticipada
        tasasAnticipadas[key] = tasaAnticipada.toFixed(5); // guardamos los resultados en el objeto
    }

    return tasasAnticipadas; // Objeto con todas las tasas nominales convertidas
};

// Pasar de TE anticipada a TE vencida 
// Recibe objeto con todas las tasas efectivas
function anticipadaVencida( data ) {
    const tasasEfectivas = efectivaEfectivas(data);

    const tasasVencidas = {}; // Objeto para guardar las tasas

    const keys = Object.keys(tasasEfectivas);
    for (const key of keys) {
        const tasaVencida = tasasEfectivas[key] / (1 - tasasEfectivas[key]);// Formula para la pasar a tansa anticipada
        tasasVencidas[key] = tasaVencida.toFixed(5); // guardamos los resultados en el objeto
    }

    return tasasVencidas; // Objeto con todas las tasas nominales convertidas
};

// Pasar de TN a TN's
// Recibe la tasa nominal con el periodo
function nominalNominales( data ) {
    const tasa = tasaDecimal(data);
    const tna = tasa * periodosPorAnio[data.periodo]; // Convertimos la tasa del usuario en TNA

    const tasasNominales = {}; // Objeto para guardar las tasas

    const keys = Object.keys(periodosDias);
    for (const key of keys) {
        const tasaNominal = tna / periodosPorAnio[key]; // tasa nominal por periodo
        tasasNominales[key] = tasaNominal.toFixed(5); // guardamos los resultados en el objeto
    }

    return tasasNominales; // Objeto con todas las tasas nominales convertidas
};

// Pasar de TE a TE's
// Recibe la tasa efectiva con su periodo
function efectivaEfectivas( data ) {
    const tasa = tasaDecimal(data);
    const periodo = periodosDias[data.periodo];

    const tasasEfectivas = {}; // Objeto para guardar las tasas
    
    const keys = Object.keys(periodosDias);
    for (const key of keys) {
        const tasaEfectiva = Math.pow(1 + tasa, periodosDias[key] / periodo) - 1; // formula para convertir las tasas
        tasasEfectivas[key] = tasaEfectiva.toFixed(5); // guardamos los resultados en el objeto
    }

    return tasasEfectivas;
};

// Funcion para buscar el tipo de conversion
function buscarConversion(obj, value1, value2) {
    for (let key of Object.keys(obj)) {
        if (obj[key][0] === value1 && obj[key][1] === value2) {
            return key;
        }
    }
    return undefined;
}


/* --------------------------
    Funcion principal
   --------------------------  */
function calcularTasa(e) {
    e.preventDefault();

    const form = document.getElementById('frmTasas');
    // Crea un objeto para almacenar los valores
    const formData = {};

    // Recorre todos los elementos del formulario
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];

        // Agrega el valor del elemento al objeto
        formData[element.name] = element.value;
    }
    const tasaDato = formData.tipoTasa;
    const tasaSolicita = formData.tasaSolicita;
    // Determinar el tipo de conversion que vamos a realizar
    const tipoConversion = buscarConversion(conversiones, tasaDato, tasaSolicita);
    console.log(tipoConversion);
    let result = operaciones[tipoConversion](formData);
    console.log(result);

}

