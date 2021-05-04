//FUNCIONES PARA FILTRAR

function filterOperacion() {
    let operacionesFiltered;
    let filter = {};

    //Cuando mi filtro exista o sea que no sea el Todos o Todas
    if (document.getElementById('tipo-select').value !== 'Todos') {
        filter.tipo = document.getElementById('tipo-select').value;
    }
    if (document.getElementById('filtros').value !== '-1') {
        filter.categoria = document.getElementById('filtros').value
    }

    let operaciones = getLocalStorage('operaciones');

    operacionesFiltered = operaciones.filter(function (item) {
        for (var key in filter) {
            if (item[key] === undefined || item[key] != filter[key])
                return false;
        }
        return true;
    });

    let fecha = document.getElementById('start').value;
    if (fecha !== '') {
        operacionesFiltered = operacionesFiltered.filter(el => dateToTimesTamp(el.fecha) >= dateToTimesTamp(fecha))

    }
    //Mostrar en la tabla este array operacionesFiltered
    crearTablaOperaciones(operacionesFiltered);
}


function dateToTimesTamp(date) {
    let myDate = date.split("-");
    let newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
    return newDate.getTime();
}


function ordenar() {
    let valorAOrdenar = document.getElementById('selectOrden').value;
    let operaciones = getLocalStorage('operaciones');

    switch (valorAOrdenar) {
        case "1":
            operaciones.sort(function (a, b) {
                return dateToTimesTamp(a.fecha) - dateToTimesTamp(b.fecha)
            });
            break;
        case "2":
            operaciones.sort(function (a, b) {
                return dateToTimesTamp(b.fecha) - dateToTimesTamp(a.fecha)
            });
            break;
        case "3":
            operaciones.sort(function (a, b) {
                return b.monto - a.monto
            });
            break;
        case "4":
            operaciones.sort(function (a, b) {
                return a.monto - b.monto
            });
            break;
        case "5":
            operaciones.sort(function (a, b) {
                if (a.descripcion > b.descripcion) {
                    return 1;
                }
                if (a.descripcion < b.descripcion) {
                    return -1;
                }
                return 0;
            });

            break;
        case "6":
            operaciones.sort(function (a, b) {
                if (a.descripcion < b.descripcion) {
                    return 1;
                }
                if (a.descripcion > b.descripcion) {
                    return -1;
                }
                return 0;
            });
    }

    crearTablaOperaciones(operaciones);
}
/******************************************************************************* */
//FUNCIÓN OCULTAR FILTROS

const alternarFiltros = () => {
    const toggle = document.getElementById('toggle-filtros')
    const filtros = document.getElementById('categoriaFiltros')

    if (toggle.innerText === 'Ocultar Filtros') {
        toggle.innerText = 'Mostrar Filtros'
        filtros.classList.add('is-hidden')
    } else {
        toggle.innerText = 'Ocultar Filtros'
        filtros.classList.remove('is-hidden')
    }
}
/******************************************************************************* */