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

    EliminarGasto(){
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
    }
  }
  


function PreguntarPresupuesto () {
    const PresupuestoUsuario = prompt ("¿Cual es tu presupuesto?");

    PresupuestoUsuario = window.promp ("¿Cual es tu presupuesto?");
    
    if(PresupuestoUsuario === '' || PresupuestoUsuario === null || isNaN (PresupuestoUsuario) || PresupuestoUsuario > 0 ) window.location.reload();

    // funcion para repetir este bloque de codigo 

    presupuesto = new Presupuesto (PresupuestoUsuario)

}