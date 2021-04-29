//  const instance = M.Tabs.init(el, options);

// NUEVA OPERACIÓN

const newOpBtn = document.getElementById('newOpBtn');
const newOperation = document.getElementById('new-operation');
const cancelOperationBtn = document.getElementById('cancelOperationBtn')
const sections = document.getElementsByTagName("section");


const controlVisibility = (page) => {
  sectionsList.forEach((section) => {
    if (section.id === page) {
      section.classList.remove("is-hidden");
    } else {
      section.classList.add("is-hidden");
    }
  });
  console.log(sectionsList);
};

const formNewOperation = document.querySelectorAll(
    "#new-operation input[data-owner], #new-operation select[data-owner]"
);

const listOperations = document.getElementById("pintar");

const formEditOperation = document
    .querySelector("#edit-operation")
    .querySelectorAll("input[data-owner], select[data-owner]");
  
const sectionsList = [...sections];





newOpBtn.addEventListener('click', ()=>{
    newOperation.style.display = 'flex'
    newOperation.style.position = 'absolute'
    newOperation.style.top = '2rem'
    newOperation.style.zIndex = '1000'
})
cancelOperationBtn.addEventListener('click', ()=>{
    newOperation.style.display = 'none';
})

// agregar operación

const descripcion = document.getElementById('descripcion');
const monto = document.getElementById('monto');
const tipo = document.getElementById('tipo');
const categoria = document.getElementById('categoria');
const fecha = document.getElementById('fecha');
const pintar = document.getElementById('pintar')

let operaciones = [];
let operationEditar = {}

const pintarOperaciones = (operaciones) => {
    pintar.innerHTML = '';
    console.log(operaciones, 'Lista');
    if (operaciones.length > 0) {
        operaciones.forEach((addNewOperation) => {
        
        let colorMonto = '';
        if (addNewOperation.tipo === 'Gasto') {
            addNewOperation.monto = `-$${addNewOperation.monto}`
            colorMonto = '#E10000';
        }else{
            addNewOperation.monto = `+$${addNewOperation.monto}`
            colorMonto = '#00D900'
        }
        const caja = `<div class="columns has-text-weight-medium is-mobile">
        <div class="column is-3">${addNewOperation.description}</div>
        <div class="column is-2">
          <span class="tag is-info is-light is-medium"
            >${addNewOperation.category}</span
          >
        </div>
        <div class="column is-3">${addNewOperation.date}</div>
        <div class="column is-2" style= "color: ${colorMonto}; font-weight: bold;">${addNewOperation.monto}</div>
        <div class="column is-2">
          <button class="button is-success is-inverted is-small" >
            <i class="far fa-edit"></i>
          </button>
          <button class="button is-danger is-inverted is-small" >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>`

        pintar.insertAdjacentHTML('beforeend', caja);

        let optionsButtons = pintar.querySelectorAll(".button");
        optionsButtons[0].onclick = () => {
          edit(addNewOperation.id);
        };
        optionsButtons[1].onclick = () => {
          deleteOp(addNewOperation.id);
        };
        })
    }
}




const addOperationBtn = () => {
    let addNewOperation = {
        descripcion: descripcion.value,
        monto: monto.value,
        tipo: tipo.value,
        categoria: categoria.value,
        fecha: fecha.value
    }

    for (let i = 0; i < formNewOperation.length; i++) {
        addNewOperation["id"] = uuid.v4();
        addNewOperation[formNewOperation[i].getAttribute("name")] =
          formNewOperation[i].value;
      }

    operaciones.push(addNewOperation)
    localStorage.setItem('operaciones', JSON.stringify(operaciones))
    operacionesLocalStorage = JSON.parse(localStorage.getItem('operaciones'))
    pintarOperaciones(operacionesLocalStorage)
    newOperation.style.display = 'none'
}
operaciones =  JSON.parse(localStorage.getItem('operaciones') || []);
pintarOperaciones(operaciones)



// Editar - Eliminar


//EDITAR



const editOperation = document.getElementById('edit-operation');
const cancelEditBtn = document.getElementById('cancelEditBtn')
const editOperationBtn = document.getElementById('editOperationBtn');


//visibilidad de formulario a editar

cancelEditBtn.addEventListener('click', ()=>{
    editOperation.style.display = 'none';
})




const edit = (id) =>{
    editOperation.style.display = 'flex'
    editOperation.style.position = 'absolute'
    editOperation.style.top = '2rem'
    editOperation.style.zIndex = '1000'
    console.log(id, "Quiero editar");
    operationEditar = operaciones.find((operaciones) => operaciones.id === id);
    console.log(operationEditar, "item a editar");
    for (let i = 0; i < formEditOperation.length; i++) {
    formEditOperation[i].value =
      operationEditar[formEditOperation[i].getAttribute("name")];
      console.log(formEditOperation[i].value);
    }
}


const confirmEditOperation = () => {
    for (let i = 0; i < formEditOperation.length; i++) {
      operationEditar[formEditOperation[i].getAttribute("name")] =
        formEditOperation[i].value;
    }
    const posOperation = operaciones.findIndex((e) => e.id === operationEditar.id);
    operaciones.splice(posOperation, 1, operationEditar);
  
    console.log();
    console.log(operaciones);
    addLocalStorage("operaciones", operaciones);
    pintarOperaciones(operationEditar);
    editOperation.style.display = 'none';
};




//Borrar

deleteOp = (id) =>{
    console.log(id, "Quiero eliminar");
  const value = operaciones.findIndex((e) => e.id == id);
  console.log(value, "quiero eliminar", id);
  if (value >= 0) {
    operaciones.splice(value, 1);
    console.log(operaciones);
    addLocalStorage("operaciones", operaciones);
    pintarOperaciones();
  }
}



const addLocalStorage = (property, value) => {
    localStorage.setItem(property, JSON.stringify(value));
};