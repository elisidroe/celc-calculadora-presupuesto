// creacion de variables
const formulario = document.querySelector('#agregar_gastos');
const gastolistado = document.querySelector('#gasto ul');

//eventos 
eventListener ();
function eventListener () {
    document.addEventListener('DOMContentLoaded', PreguntarPresupuesto);   
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
        const gastado =  this.gastos.reduce((total, gasto) => total + gastado.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(){
        this.gastos = this.gastos.filter (gasto => gasto.id !== id);
        this.calcularRestante();
    }
  }

  class Interfaz {
    insertarPresupuesto(cantidad){
        
        //Extraer los valores que agregamos
        const {presupuesto, restante } = cantidad;

        //Agregar HTML
        document.querySelector ('#total').textContent = presupuesto;

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
        this.limpiarHTML(); //Esta funcion elimina el HTML previo

        // iterar sobre los gastos

        gastos.forEach(gastos => {
            const {cantidad, nombre, id } = gasto;

            //Crear las li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = '';
            nuevoGasto.dataset.id = id;

            //agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span> $ ${cantidad} </span>`;
            
            //boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'borrar-gasto');

            btnBorrar.innerHTML = 'Borrar'

            // funcion para borrar el gasto
            btnBorrar.onclick = () =>{
                eliminarGasto(id);
            }

            nuevoGasto.appendChild(btnBorrar);

            gastolistado.appendChild(nuevoGasto);
        });
    }

            limpiarHTML(){
                while(gastolistado.firstChild){
                    gastolistado.removeChild(gastolistado.firstChild);
                }
            }
            actualizarRestante(restante){
                document.querySelector('restante').textContent = restante;
            }
            comprobarPresupuesto(presupuestoObj){
                const { presupuesto, restante} = presupuestoObj;
                const restanteDiv = document.querySelector('.restante');
            }
  }
  


function PreguntarPresupuesto () {
    const PresupuestoUsuario = prompt ("¿Cual es tu presupuesto?");

    PresupuestoUsuario = window.promp ("¿Cual es tu presupuesto?");
    
    if(PresupuestoUsuario === '' || PresupuestoUsuario === null || isNaN (PresupuestoUsuario) || PresupuestoUsuario > 0 ) window.location.reload();

    // funcion para repetir este bloque de codigo 

    presupuesto = new Presupuesto (PresupuestoUsuario)

}
