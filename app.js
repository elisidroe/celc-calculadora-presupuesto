// creacion de variables
const formulario = document.querySelector('#agregar_gastos');
const gastoListado = document.querySelector('#listado_gastos ul');

//eventos 
eventListener ();
function eventListener () {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);   
        formulario.addEventListener('submit', agregarGasto);
}

//clases
class Presupuesto {
    constructor(presupuesto) {
      this.presupuesto = Number (presupuesto);
      this.restante = Number (presupuesto);
      this.gastos = [];
    }
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado =  this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
    }
  }

  class Interfaz {
    insertarPresupuesto(cantidad) {
        
        //Extraer los valores que agregamos
        const {presupuesto, restante } = cantidad;

        document.querySelector('#presupuesto').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;

    }
    imprimirAlerta(mensaje, tipo){
        //crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-align: center', 'blackground-color: #007bff');

        if(tipo === 'error'){
            divMensaje.classList.add('padding: 15 ppx', 'margin-bottom: 20px', 'border: 1px solid transparent', 'border-radius: 3px');
        } else{
            divMensaje.classList.add('background-color: #dff0d8', 'border-color: #d6e9c6', 'color: #3c763d');
        } 
        
        // mensaje de error

        divMensaje.textContent = mensaje;

        //insertar HTML

        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //Quitar el mensaje a los 3 segundos

        setTimeout(() => {
            divMensaje.remove();
        }, 3000)
    }

    mostrarGastos(gastos){
        this.limpiarHTML(); 
        //Esta funcion elimina el HTML previo

        // iterar sobre los gastos

        gastos.forEach(gasto => {
            const {cantidad, nombre, id } = gasto;

            //Crear las li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            //agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span> $ ${cantidad} </span>`;
            
            //boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');

            btnBorrar.innerHTML = 'Borrar &times;'

            // funcion para borrar el gasto
            btnBorrar.onclick = () =>{
                eliminarGasto(id);
            }

            nuevoGasto.appendChild(btnBorrar);

            gastoListado.appendChild(nuevoGasto);
        });
    }

            limpiarHTML(){
                while(gastoListado.firstChild){
                    gastoListado.removeChild(gastoListado.firstChild);
                }
            }
            actualizarRestante(restante){
                document.querySelector('#restante').textContent = restante;
            }
            comprobarPresupuesto(presupuestoObj){
                const { presupuesto, restante } = presupuestoObj;
                const restanteDiv = document.querySelector('.restante'); //Comprobar 25%
                if( (presupuesto /  4) > restante){
                    restanteDiv.classList.remove('alert-success', 'alert-warning'); //Para quitar clase
                    restanteDiv.classList.add('alert-danger'); // Para añadir nueva clase
                } else if( (presupuesto / 2 ) > restante ) {
                    restanteDiv.classList.remove('alert-success'); //Para quitar clase
                    restanteDiv.classList.add('alert-warning'); // Para añadir nueva clase
                } else{
                    restanteDiv.classList.remove('alert-danger', 'alert-warning'); //Para quitar clase
                    restanteDiv.classList.add('alert-success'); // Para añadir nueva clase
                }
        
                //Si el total es 0 o menor
                if (restante <= 0) {
                    ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
                    formulario.querySelector('button[type="submit"]').disabled = true;
                }
            }
        }
        
        //Instanciar
        const ui = new Interfaz(); 
        
        let presupuesto;
        
        
        
        //funciones--------------------------
        
        function preguntarPresupuesto (){ 
            const presupuestoUsuario = prompt("¿Cual es tu presupuesto?");
        
            //console.log(presupuestoUsuario);
        
            if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
                window.location.reload();  //Funcion que vuelve a repetir la peticion de datos en caso de estar vacia.
            }
        
            //Presupuesto Valido
            presupuesto = new Presupuesto (presupuestoUsuario);
            
        
            ui.insertarPresupuesto(presupuesto);
        }
        
        //Añade Gastos
        function agregarGasto(e){
            e.preventDefault();
            
            //Leer los datos del formulario
            const nombre = document.querySelector('#gasto').value;
            const cantidad = Number(document.querySelector('#cantidad').value);
        
            //Validar
            if(nombre === '' || cantidad === ''){
                ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
                return;
        
            } else if( cantidad <= 0 || isNaN(cantidad)){
                ui.imprimirAlerta('Cantidad no válida', 'error');
                return;
            }
        
            //Generar un objeto con el gasto
            const gasto = { nombre, cantidad, id: Date.now() };
        
            //añade un nuevo gasto
            presupuesto.nuevoGasto(gasto);
        
            //Mensaje de todo bien!
            ui.imprimirAlerta('Gasto agregado Correctamente.');
        
            //Imprimir los gastos
            const { gastos, restante } = presupuesto;
            ui.mostrarGastos(gastos);
        
            ui.actualizarRestante(restante);
        
            ui.comprobarPresupuesto(presupuesto);
        
            //Reinicia el formulario
            formulario.reset();
          
        }
        
        //Funcion para borrar gasto
        function eliminarGasto(id){
            //Elimina del objecto
            presupuesto.eliminarGasto(id);
        
            //Elimina los gastos del HTML.
            const { gastos, restante } = presupuesto 
            ui.mostrarGastos(gastos);
            ui.actualizarRestante(restante);
            ui.comprobarPresupuesto(presupuesto);
        }