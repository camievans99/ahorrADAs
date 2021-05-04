//  const instance = M.Tabs.init(el, options);

// FUNCIÓN NUEVA OPERACIÓN

const newOpBtn = document.getElementById('newOpBtn');
const newOperation = document.getElementById('new-operation');
const cancelOperationBtn = document.getElementById('cancelOperationBtn')

const sectionsList = document.getElementsByTagName("section");
let currentOperationIdToUpdate = '';
let currentCategoriaToUpdate = '';
const showMain = () => {
  controlVisibility(['home']);
  refrescarSelectCategoria();
}

const mostrarNuevaOperacion = () => {
  controlVisibility('new-operation');

}

/******************************************************************************* */
//FUNCION PARA EDITAR OPERACIONES


const mostrarEditarOperacion = (idOperacion) => {
  let operaciones = getLocalStorage('operaciones')
  let operacion = operaciones.find(element => element.id === idOperacion);
  document.getElementById('descripcionEdit').value = operacion.descripcion;
  document.getElementById('montoEdit').value = operacion.monto;
  document.getElementById('tipoEdit').value = operacion.tipo;
  document.getElementById('categoriaEdit').value = operacion.categoria;
  document.getElementById('fechaEdit').value = operacion.fecha;
  controlVisibility('edit-operation');
  currentOperationIdToUpdate = idOperacion;
}


/******************************************************************************* */
//FUNCION PARA REFRESCAR CATEGORIAS

function refrescarSelectCategoria() {
  //Cargo las categorias en el Combo
  let categorias = getLocalStorage('categorias'); //Obtengo las categorias del localStorage
  let selectCategoria = document.getElementById("categoria");
  let selectFiltroCategoria = document.getElementById('filtros');




  //Elimino todos los options del select, para volver a cargar los valores
  while (selectCategoria.length > 0) {
    selectCategoria.remove(0);
  }

  while (selectFiltroCategoria.length > 0) {
    selectFiltroCategoria.remove(0);
  }

  let optionTodos = document.createElement("option");
  optionTodos.setAttribute("value", -1);
  let textTodos = document.createTextNode('Todas');
  optionTodos.appendChild(textTodos);
  selectFiltroCategoria.appendChild(optionTodos);

  //Agrego al select las categorias
  categorias.forEach(categoria => {
    let option = document.createElement("option");
    option.setAttribute("value", categoria.name);
    let text = document.createTextNode(categoria.name);
    option.appendChild(text);
    selectCategoria.appendChild(option);
  })

  categorias.forEach(categoria => {
    let option = document.createElement("option");
    option.setAttribute("value", categoria.name);
    let text = document.createTextNode(categoria.name);
    option.appendChild(text);
    selectFiltroCategoria.appendChild(option);
  })
}

const controlVisibility = (sectionId) => {
  if (typeof sectionId === 'string') {
    sectionId = [sectionId];
  }
  for (let i = 0; i < sectionsList.length; i++) {
    const section = sectionsList[i];
    if (sectionId.includes(section.id)) {
      section.classList.remove("is-hidden");
      if (!section.classList.contains('is-visible')) {
        section.classList.add("is-visible");
      }
    } else {
      section.classList.remove("is-visible");
      if (!section.classList.contains('is-hidden')) {
        section.classList.add("is-hidden");
      }
    }
  }
  console.log(sectionsList);
};


/******************************************************************************* */
//FUNCIÓN PARA CREAR TABLA DE NUEVA OPERACIÓN EN EL HOME DE BALANCE

function crearTablaOperaciones(elements) {
  document.getElementById('table').innerHTML = "";

  if (elements.length === 0) {
    document.getElementById('imagenCentral').style.display = "";
    document.getElementById('table').style.display = "none";
    return;
  }

  document.getElementById('imagenCentral').style.display = "none";
  document.getElementById('table').style.display = "";

  let tr = document.createElement('tr');
  let thDescripcion = document.createElement('th');
  let thCategoria = document.createElement('th');
  let thFecha = document.createElement('th');
  let thMonto = document.createElement('th');
  let thAcciones = document.createElement('th');

  thDescripcion.innerText = 'Descripcion';
  thCategoria.innerText = 'Categoría';
  thFecha.innerText = 'Fecha';
  thMonto.innerText = 'Monto';
  thAcciones.innerText = 'Acciones';


  tr.appendChild(thDescripcion);
  tr.appendChild(thDescripcion);
  tr.appendChild(thCategoria);
  tr.appendChild(thFecha);
  tr.appendChild(thMonto);
  tr.appendChild(thAcciones);
  document.getElementById('table').appendChild(tr);

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    let tr = document.createElement('tr');
    let tdDescripcion = document.createElement('td');
    let tdCategoria = document.createElement('td');
    let tdFecha = document.createElement('td');
    let tdMonto = document.createElement('td');
    let tdAcciones = document.createElement('td');
    let aEliminar = document.createElement('a');
    let barra = document.createElement('span');
    let aEditar = document.createElement('a');
    tdDescripcion.innerText = element.descripcion;
    tdCategoria.innerText = element.categoria;
    tdFecha.innerText = element.fecha;
    tdMonto.innerText = element.monto;
    aEditar.innerText = 'Editar';
    barra.innerText = ' / ';
    aEliminar.innerText = 'Eliminar';
    aEliminar.addEventListener('click', () => {
      eliminarOperacion(element.id)
    })
    aEditar.addEventListener('click', () => {
      mostrarEditarOperacion(element.id)
    })


    tr.appendChild(tdDescripcion);
    tr.appendChild(tdCategoria);
    tr.appendChild(tdFecha);
    tr.appendChild(tdMonto);
    tdAcciones.appendChild(aEditar);
    tdAcciones.appendChild(barra);
    tdAcciones.appendChild(aEliminar);
    tr.appendChild(tdAcciones);
    document.getElementById('table').appendChild(tr);

  }
}


/******************************************************************************* */
//Función que Crea la tabla de categorias en base al localStorage

function crearTablaCategoria() {
  let tableName = 'tableCategories';
  let elements = getLocalStorage('categorias');
  document.getElementById(tableName).innerHTML = "";

  if (elements.length === 0) {
    elements.push({
      id: uuid.v4(),
      name: 'Comida'
    });
    elements.push({
      id: uuid.v4(),
      name: 'Servicios'
    });
    elements.push({
      id: uuid.v4(),
      name: 'Salidas'
    });
    elements.push({
      id: uuid.v4(),
      name: 'Educación'
    });
    elements.push({
      id: uuid.v4(),
      name: 'Transporte'
    });
    elements.push({
      id: uuid.v4(),
      name: 'Trabajo'
    });
    setLocalStorage('categorias', elements);
    return;
  }

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    let tr = document.createElement('tr');
    let tdDescripcion = document.createElement('td');
    tdDescripcion.className = 'column is-three-quarters';
    let tdEditar = document.createElement('td');
    let aEditar = document.createElement('a');
    let tdEliminar = document.createElement('td');
    let aEliminar = document.createElement('a');
    tdDescripcion.innerText = element.name;
    aEditar.innerText = 'Editar';
    aEliminar.innerText = 'Eliminar';
    aEliminar.addEventListener('click', () => {
      eliminarCategoria(element.id)
    })
    aEditar.addEventListener('click', () => {
      mostrarEditarCategoria(element.id)
    })

    tr.appendChild(tdDescripcion);
    tdEditar.appendChild(aEditar);
    tr.appendChild(tdEditar);
    tdEliminar.appendChild(aEliminar);
    tr.appendChild(tdEliminar);
    document.getElementById(tableName).appendChild(tr);
  }
}

/******************************************************************************* */
//FUNCIÓN PARA AÑADIR OPERACIONES

function agregarOperacion() {
  let descripcion = document.getElementById('descripcion').value;
  let monto = document.getElementById('monto').value;
  let tipo = document.getElementById('tipo').value;
  let categoria = document.getElementById('categoria').value;
  let fecha = document.getElementById('fecha').value;

  const operacion = {
    id: uuid.v4(),
    descripcion: descripcion,
    monto: Number(monto),
    tipo: tipo,
    categoria: categoria,
    fecha: fecha
  }

  operacionesLocalStorage = getLocalStorage('operaciones')
  operacionesLocalStorage.push(operacion);
  setLocalStorage('operaciones', operacionesLocalStorage);
  showMain();
  crearTablaOperaciones(operacionesLocalStorage);
  refrescarDatosBalance();
  limpiarFormulario()
}


/******************************************************************************* */
//FUNCIÓN PARA AGREGAR CATEGORÍAS 

function agregarCategoria() {
  let descripcion = document.getElementById('category-input-new').value;

  if (descripcion.length === 0) {
    return;
  }

  categoriasLocalStorage = getLocalStorage('categorias')
  categoriasLocalStorage.push({
    id: uuid.v4(),
    name: descripcion
  });
  setLocalStorage('categorias', categoriasLocalStorage);
  controlVisibility('categories')
  crearTablaCategoria();
  limpiarCategorias();
}


/******************************************************************************* */
//TODO: meter en el OnLoad
window.addEventListener("load", onLoad);


function onLoad() {
  let operacionesLocalStorage = getLocalStorage('operaciones')
  let categoriasLocalStorage = getLocalStorage('categorias')
  if (!operacionesLocalStorage) {
    setLocalStorage('operaciones', []);
  }

  if (!categoriasLocalStorage) {
    setLocalStorage('categorias', []);
  }

  crearTablaOperaciones(getLocalStorage('operaciones'));
  crearTablaCategoria();
  refrescarDatosBalance();
  refrescarSelectCategoria();
  showMain();
}




function setLocalStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor))
}


function getLocalStorage(clave) {
  return JSON.parse(localStorage.getItem(clave))
}


/******************************************************************************* */
//FUNCIÓN PARA RESFRESCAR DATOS EN LA PÁGINA

function refrescarDatosBalance() {
  let operacionesLocalStorage = getLocalStorage('operaciones')
  let gastos = 0;
  let ganancia = 0;
  let total = 0;

  for (let i = 0; i < operacionesLocalStorage.length; i++) {
    const element = operacionesLocalStorage[i];

    if (element.tipo.toLowerCase() === 'ganancia') {
      ganancia += element.monto;
    } else {
      gastos += element.monto;
    }
    total = ganancia - gastos;
  }
  document.getElementById('gastoTotal').innerText = `$${total}`;
  document.getElementById('gananciaValor').innerText = `+$${ganancia}`;
  document.getElementById('gastoValor').innerText = `-$${gastos}`;

}


/******************************************************************************* */
//FUNCIONES PARA ELIMINAR 

function eliminarCategoria(categoriaToDelete) {
  //Agarro las categorias de localStorage y lo meto en la variable categorias.
  let categorias = getLocalStorage('categorias')
  //Borro el elemento
  let newCategory = categorias.filter(element => element.id !== categoriaToDelete);
  //Guardo nmi nuevo arr de Categorias en el localStorage.
  setLocalStorage('categorias', newCategory);
  //Refresco la tabla de categorias. 
  crearTablaCategoria();
}

function eliminarOperacion(operacionToDelete) {
  let operaciones = getLocalStorage('operaciones')
  let newOperaciones = operaciones.filter(element => element.id !== operacionToDelete);
  setLocalStorage('operaciones', newOperaciones);
  crearTablaOperaciones(newOperaciones);
  refrescarDatosBalance();
}

/******************************************************************************* */
//FUNCIONES PARA EDITAR PANTALLA BALANCE

function editarOperacion() {
  let descripcion = document.getElementById('descripcionEdit').value;
  let monto = document.getElementById('montoEdit').value;
  let tipo = document.getElementById('tipoEdit').value;
  let categoria = document.getElementById('categoriaEdit').value;
  let fecha = document.getElementById('fechaEdit').value;

  //Obtener el array desde el localStorage
  let operaciones = getLocalStorage('operaciones');

  //Modifico el elemento correspondiente del array
  for (let i = 0; i < operaciones.length; i++) {
    const element = operaciones[i];
    if (element.id === currentOperationIdToUpdate) {
      //Modifico el elemento 
      operaciones[i].descripcion = descripcion;
      operaciones[i].monto = Number(monto);
      operaciones[i].tipo = tipo;
      operaciones[i].categoria = categoria;
      operaciones[i].fecha = fecha;
      break;
    }
  }

  //Actualizar localstorage con el array
  setLocalStorage('operaciones', operaciones);
  showMain();
  crearTablaOperaciones(operaciones);
  refrescarDatosBalance();
}


/******************************************************************************* */
//FUNCIÓN LIMPIAR FORMULARIO

function limpiarFormulario() {
  document.getElementById('descripcion').value = '';
  document.getElementById('monto').value = '';
  document.getElementById('tipo').value = '';
  document.getElementById('categoria').value = '';
  document.getElementById('fecha').value = '';
}

/******************************************************************************* */

// //FUNCIÓN  LIMPIAR CATEGORÍAS

function limpiarCategorias() {
  document.getElementById("category-input-new").value = '';

}


/******************************************************************************* */
// //FUNCIONES PARA EDITAR PANTALLA DE CATEGORIAS


function mostrarEditarCategoria(idCategoria) {

  let categorias = getLocalStorage('categorias')
  let categoria = categorias.find(element => element.id === idCategoria);
  document.getElementById('category-input-edit').value = categoria.name;

  controlVisibility('editar-categorias');
  currentCategoriaToUpdate = idCategoria;

}

function editarCategoria() {
  let descripcion = document.getElementById('category-input-edit').value;

  // //Obtener el array desde el localStorage
  let categorias = getLocalStorage('categorias');

  // //Modifico el elemento correspondiente del array
  for (let i = 0; i < categorias.length; i++) {
    const element = categorias[i];
    if (element.id === currentCategoriaToUpdate) {
      //Modifico el elemento 
      categorias[i].name = descripcion;
      break;
    }
  }

  // //Actualizar localstorage con el array
  setLocalStorage('categorias', categorias);
  crearTablaCategoria()
  controlVisibility('categories')
}


/******************************************************************************* */

